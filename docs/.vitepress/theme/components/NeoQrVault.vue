<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { useData, withBase } from 'vitepress'

/** 圆形可拖拽热区边长（px），与 CSS 中圆钮大小一致 */
const KNOB = 56
/** 贴边时与视口边缘的最小间距（px） */
const MARGIN = 100
/** localStorage 中保存 last x/y 的键名 */
const STORAGE_KEY = 'neo-qr-fab-pos'
/** 公网/含 base 的二维码图路径 */
// const src = withBase('/img/neo-cmp-docs.png') // github 可访问地址
const src = withBase('/img/netlify.png')

const { page } = useData()

/** 是否已在客户端挂载（为 true 后才使用窗口与存储，与 SSR 区分） */
const isClient = ref(false)
/** 视口宽度是否 ≥ 430px（与业务约定一致，窄屏不展示浮层） */
const isWide = ref(true)
/** 是否按移动设备/UA 处理（不展示浮层） */
const isMobile = ref(false)
/** 是否正在拖拽圆钮，用于隐藏 hover 弹层、切换光标 */
const isDragging = ref(false)

/** 是否文档首页：仅 `index` 等入口需展示浮层 */
const isHome = computed(() => {
  const p = (page.value?.relativePath ?? '')
    .replace(/\\/g, '/')
    .toLowerCase()
  return p === 'index.md' || p === 'index' || p === ''
})

/** 圆钮左上角相对视口的坐标（与 `position: fixed; left/top` 一致） */
const x = ref(0)
const y = ref(0)

/**
 * 是否挂载 Teleport：需已 hydration、在首页、视口够宽、且非移动设备
 */
const canShow = computed(
  () => isClient.value && isHome.value && isWide.value && !isMobile.value
)

/**
 * 拖拽过程状态：一次按下中记录元素起点与指针起点
 */
let drag: {
  elX: number
  elY: number
  startX: number
  startY: number
} | null = null

/** 根据视口宽度与 User-Agent / userAgentData 更新「是否可展示」 */
function readVisibility() {
  if (typeof window === 'undefined') return
  isWide.value = window.innerWidth >= 430
  const ua = navigator.userAgent
  if (
    (navigator as Navigator & { userAgentData?: { mobile?: boolean } }).userAgentData
      ?.mobile === true
  ) {
    isMobile.value = true
  } else {
    isMobile.value =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS|FxiOS|EdgiOS|EdgA|WPDesktop|Opera Mobi|IEMobile/i.test(
        ua
      )
  }
}

/** 将 (x, y) 限制在视口内，并预留 MARGIN，避免热区被裁出屏幕 */
function clamp() {
  if (typeof window === 'undefined') return
  const maxX = window.innerWidth - KNOB - MARGIN
  const maxY = window.innerHeight - KNOB - MARGIN
  const min = MARGIN
  x.value = Math.min(maxX, Math.max(min, x.value))
  y.value = Math.min(maxY, Math.max(min, y.value))
}

/** 无有效缓存时：默认放在视口右下方 */
function defaultPos() {
  if (typeof window === 'undefined') return
  x.value = window.innerWidth - KNOB - MARGIN
  y.value = window.innerHeight - KNOB - MARGIN
}

/** 从 localStorage 恢复上次位置；无数据或异常则走 defaultPos + clamp */
function loadPos() {
  if (typeof localStorage === 'undefined') {
    defaultPos()
    return
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      defaultPos()
      return
    }
    const p = JSON.parse(raw) as { x?: number; y?: number }
    if (typeof p.x === 'number' && typeof p.y === 'number') {
      x.value = p.x
      y.value = p.y
      clamp()
    } else {
      defaultPos()
    }
  } catch {
    defaultPos()
  }
}

/** 将当前 x/y 持久化，供下次进入首页时恢复 */
function savePos() {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: x.value, y: y.value }))
  } catch {
    /* ignore */
  }
}

/** 在圆钮上按下左键：开始拖拽、在 window 上监听 move/up，并禁止拖拽时选中页面文字 */
function onDown(e: MouseEvent) {
  if (e.button !== 0) return
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
  drag = {
    elX: x.value,
    elY: y.value,
    startX: e.clientX,
    startY: e.clientY,
  }
  window.addEventListener('mousemove', onMove, { capture: true })
  window.addEventListener('mouseup', onUp, { capture: true })
  document.body.style.userSelect = 'none'
}

/** 按下过程中移动指针：按差值平移并 clamp */
function onMove(e: MouseEvent) {
  if (!drag) return
  e.preventDefault()
  const dx = e.clientX - drag.startX
  const dy = e.clientY - drag.startY
  x.value = drag.elX + dx
  y.value = drag.elY + dy
  clamp()
}

/** 释放鼠标：结束拖拽、写回 localStorage 并移除监听 */
function onUp() {
  isDragging.value = false
  drag = null
  savePos()
  document.body.style.userSelect = ''
  window.removeEventListener('mousemove', onMove, { capture: true })
  window.removeEventListener('mouseup', onUp, { capture: true })
}

/** 视口变化时重新判定是否可展示，并防位置跑出屏幕 */
function onWindowResize() {
  readVisibility()
  clamp()
}

/** 切页/关闭页面前再保存一次，减少未触发 mouseup 时丢位置 */
function onPageHide() {
  savePos()
}

/** 首次进入页面：标记客户端、读展示条件、恢复位置并监听 resize / pagehide */
onMounted(() => {
  isClient.value = true
  readVisibility()
  loadPos()
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('pagehide', onPageHide)
})

/** 路由离开或组件销毁：保存位置并移除全部窗口/拖拽监听 */
onUnmounted(() => {
  savePos()
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('pagehide', onPageHide)
  window.removeEventListener('mousemove', onMove, { capture: true })
  window.removeEventListener('mouseup', onUp, { capture: true })
  document.body.style.userSelect = ''
})

/** 绑定到根节点上的 fixed 定位与热区尺寸 */
const fabStyle = computed(() => ({
  left: `${x.value}px`,
  top: `${y.value}px`,
  width: `${KNOB}px`,
  height: `${KNOB}px`,
}))

/** SPA 切换页面时：更新是否首页/是否可展示；若回到可展示的首页则重新 loadPos */
watch(
  () => page.value?.relativePath,
  () => {
    if (typeof window === 'undefined' || !isClient.value) return
    readVisibility()
    if (isHome.value && isWide.value && !isMobile.value) {
      loadPos()
    }
  }
)
</script>

<template>
  <Teleport to="body" v-if="canShow">
    <div
      class="neo-qr-fab"
      :class="{ 'is-dragging': isDragging }"
      :style="fabStyle"
      role="complementary"
      aria-label="文档站二维码，悬停查看大图，可按住拖动"
    >
      <div class="neo-qr-fab__popover" role="tooltip">
        <p class="neo-qr-fab__head">手机扫描访问</p>
        <div class="neo-qr-fab__big-wrap">
          <img
            class="neo-qr-fab__big"
            :src="src"
            width="200"
            height="200"
            alt="扫描访问文档站"
            draggable="false"
            @dragstart.prevent
          />
        </div>
      </div>
      <div class="neo-qr-fab__bridge" aria-hidden="true" @mousedown.stop />
      <button
        type="button"
        class="neo-qr-fab__knob"
        aria-label="二维码：按住拖动，悬停展开"
        @mousedown="onDown"
      >
        <img
          class="neo-qr-fab__thumb"
          :src="src"
          alt=""
          width="40"
          height="40"
          draggable="false"
          @dragstart.prevent
        />
      </button>
    </div>
  </Teleport>
</template>
