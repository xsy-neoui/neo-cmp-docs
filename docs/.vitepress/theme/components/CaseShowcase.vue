<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'

interface CaseItem {
  title: string
  desc: string
  /** 视频路径（优先） */
  video: string
  /** 封面图路径（降级用） */
  poster?: string
  template: string
}

const cases: CaseItem[] = [
  {
    title: '案例一：H5 端自定义列表页',
    desc: '基于自定义组件快速搭建的 H5 端列表页面，支持全局搜索、打开AI对话框、分页加载列表数据等移动端交互。',
    video: withBase('/video/NeoEntityList-demo.mp4'),
    template: 'neo init -t neo-h5-cmps -n myH5Cmps'
  },
  {
    title: '案例二：PC 端自定义列表页',
    desc: '使用平台预置列表组件 + 自定义组件（自定义查询条件）实现个性化的查询+数据列表展示。',
    video: withBase('/video/EntityGrid-demo.mp4'),
    template: 'neo init -t neo-web-entity-grid -n myWebListCmp'
  },
  {
    title: '案例三：BI 数据页',
    desc: '基于自定义报表组件实现酷炫的BI数据大屏效果页',
    video: withBase('/video/BI.mp4'),
    template: 'neo init -t neo-pipeline-zh-cmps -n pipelineCmps'
  },
  {
    title: '案例四：自定义表单页（新增业务数据）',
    desc: '通过自定义组件实现子表的批量数据插入与汇总统计功能。',
    video: withBase('/video/custom-form.mp4'),
    template: 'neo init -t neo-web-form -n myCustomForm'
  },
]

/*
之前组件使用 GIF 图片做案例展示，现已替换为 MP4 视频。
竖向移动端录屏的长宽比依然用 tall-aspect 逻辑做限宽居中,
视频通过 loadedmetadata 事件获取 videoWidth/videoHeight 判断。
*/
const activeIndex = ref<number | null>(null)
/** 竖长视频（典型移动端 H5 录屏），用于限宽居中 */
const previewIsTall = ref(false)
const previewVideoRef = ref<HTMLVideoElement | null>(null)
/** 卡片封面视频上记录宽高比，用于判断竖长视频 */
const CARD_TALL_ATTR = 'data-is-tall'

/** 高/宽 >= 1.2 视为竖长截图 */
const TALL_ASPECT_THRESHOLD = 1.2

function applyPreviewTallness(el: HTMLVideoElement | null) {
  if (!el || !el.videoWidth || !el.videoHeight) {
    return
  }
  previewIsTall.value = el.videoHeight / el.videoWidth >= TALL_ASPECT_THRESHOLD
}

function onPreviewVideoMeta(e: Event) {
  applyPreviewTallness(e.target as HTMLVideoElement)
}

/** 卡片悬浮自动播放时，用 data 属性标记是否竖长，以便卡片 CSS 限宽 */
function onCardVideoReady(e: Event) {
  const v = e.target as HTMLVideoElement
  if (v.videoWidth && v.videoHeight) {
    const isTall = v.videoHeight / v.videoWidth >= TALL_ASPECT_THRESHOLD
    if (isTall) {
      v.setAttribute(CARD_TALL_ATTR, '')
    } else {
      v.removeAttribute(CARD_TALL_ATTR)
    }
  }
}

function openPreview(index: number) {
  activeIndex.value = index
  previewIsTall.value = false
}

function closePreview() {
  activeIndex.value = null
  previewIsTall.value = false
}
</script>

<template>
  <div class="case-showcase">
    <div class="case-grid">
      <div
        v-for="(item, index) in cases"
        :key="index"
        class="case-item"
      >
        <h3 class="case-item__title">{{ item.title }}</h3>
        <div
          class="case-card"
          @click="openPreview(index)"
        >
          <div class="case-card__cover">
            <video
              :src="item.video"
              muted
              loop
              playsinline
              preload="metadata"
              @mouseenter="($event.target as HTMLVideoElement)?.play()"
              @mouseleave="($event.target as HTMLVideoElement)?.pause()"
              @loadedmetadata="onCardVideoReady($event)"
            ></video>
            <div class="case-card__overlay">
              <span class="case-card__play">▶ 点击预览</span>
            </div>
          </div>
          <div class="case-card__body">
            <p class="case-card__desc">{{ item.desc }}</p>
            <div
              v-if="item.template"
              class="case-card__template"
            >
              <span class="case-card__template-label">安装模板</span>
              <code class="case-card__template-code">{{ item.template }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏预览弹层 -->
    <Teleport to="body">
      <Transition name="case-fade">
        <div
          v-if="activeIndex !== null"
          class="case-preview"
          @click.self="closePreview"
          role="dialog"
          aria-modal="true"
          :aria-label="cases[activeIndex].title"
        >
          <div
            class="case-preview__inner"
            :class="{ 'case-preview__inner--tall-asset': previewIsTall }"
          >
            <div class="case-preview__header">
              <button
                class="case-preview__close"
                @click="closePreview"
                aria-label="关闭预览"
              >
                ✕
              </button>
              <h3 class="case-preview__title">{{ cases[activeIndex].title }}</h3>
            </div>
            <div
              class="case-preview__scroll"
              :class="{ 'case-preview__scroll--tall-asset': previewIsTall }"
            >
              <div
                class="case-preview__img-wrap"
                :class="{ 'case-preview__img-wrap--tall': previewIsTall }"
              >
                <video
                  ref="previewVideoRef"
                  :key="`preview-${activeIndex}`"
                  controls
                  autoplay
                  muted
                  playsinline
                  preload="metadata"
                  :src="cases[activeIndex].video"
                  @loadedmetadata="onPreviewVideoMeta"
                >
                  您的浏览器不支持视频播放
                </video>
              </div>
            </div>
            <div class="case-preview__footer">
              <p class="case-preview__desc">{{ cases[activeIndex].desc }}</p>
              <div
                v-if="cases[activeIndex].template"
                class="case-preview__template"
              >
                <span class="case-preview__template-label">安装模板：</span>
                <pre class="case-preview__template-code"><code>{{ cases[activeIndex].template }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.case-showcase {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.case-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.case-item__title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

/* ---- 卡片 ---- */
.case-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

html.dark .case-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.case-card__cover {
  position: relative;
  width: 100%;
  max-height: 360px;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-card__cover img,
.case-card__cover video {
  width: 100%;
  height: auto;
  max-height: 360px;
  object-fit: contain;
  display: block;
  transition: transform 0.3s;
}

.case-card:hover .case-card__cover img,
.case-card:hover .case-card__cover video {
  transform: scale(1.03);
}

.case-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.25s;
}

.case-card:hover .case-card__overlay {
  opacity: 1;
}

.case-card__play {
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;
  background: rgba(43, 123, 242, 0.85);
  backdrop-filter: blur(4px);
}

.case-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px 20px;
}

.case-card__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.case-card__template-label {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
}

.case-card__template-code {
  display: block;
  margin: 0;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.45;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  word-break: break-word;
}

/* ---- 全屏预览 ---- */
.case-preview {
  --case-preview-overlay-pad: 16px;
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: max(
      var(--case-preview-overlay-pad),
      env(safe-area-inset-top, 0px)
    )
    max(
      var(--case-preview-overlay-pad),
      env(safe-area-inset-right, 0px)
    )
    max(
      var(--case-preview-overlay-pad),
      env(safe-area-inset-bottom, 0px)
    )
    max(
      var(--case-preview-overlay-pad),
      env(safe-area-inset-left, 0px)
    );
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  /* 总高度可能超出时允许整层滚动，避免弹窗被裁切导致中部/底部像被挡住 */
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.case-preview__inner {
  --case-preview-header-h: 72px;
  --case-preview-footer-min: 96px;
  /* 94vh 与 上下 padding 叠加会超过 100vh，用 calc 将弹层限制在视口内 */
  --case-preview-avail-h: min(
    94vh,
    calc(
      100vh - 2 * var(--case-preview-overlay-pad) - env(
          safe-area-inset-top,
          0px
        ) - env(safe-area-inset-bottom, 0px)
    )
  );
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(96vw, 1280px);
  max-width: 1280px;
  flex: 0 1 auto;
  max-height: var(--case-preview-avail-h);
  height: var(--case-preview-avail-h);
  min-height: 0;
  overflow: hidden;
  background: var(--vp-c-bg);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

html.dark .case-preview__inner {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
}

/* 固定高度头部 */
.case-preview__header {
  flex: 0 0 var(--case-preview-header-h);
  height: var(--case-preview-header-h);
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 52px 0 24px;
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
  background: var(--vp-c-bg);
}

.case-preview__close {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.case-preview__close:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.case-preview__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 中间：视频可纵向滚动 */
.case-preview__scroll {
  flex: 1 1 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 16px 24px;
  -webkit-overflow-scrolling: touch;
}

/* 竖长图时中间区略收紧内边距，让「手机条」在视口里更占满、少两侧留白压迫感 */
.case-preview__scroll--tall-asset {
  padding-left: 12px;
  padding-right: 12px;
}

.case-preview__img-wrap {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  box-sizing: border-box;
}

/* 竖长移动端大图：在宽弹窗中不再被横向拉满，按接近手机宽展示，总高度成比例变短、滚动更可控 */
.case-preview__img-wrap--tall {
  max-width: min(100%, 440px);
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.case-preview__img-wrap img,
.case-preview__img-wrap video {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 80vh;
}

@supports (height: 1dvh) {
  .case-preview__inner {
    /* 移动浏览器里 vh 会含/不含地址栏，dvh 更稳，减少竖长图在真实视口里的「上下被吃」感 */
    --case-preview-avail-h: min(
      92dvh,
      calc(
        100dvh - 2 * var(--case-preview-overlay-pad) - env(
            safe-area-inset-top,
            0px
          ) - env(safe-area-inset-bottom, 0px)
      )
    );
  }
}

/* 底部：描述 + 模板，内容多时可滚动 */
.case-preview__footer {
  flex: 0 1 auto;
  min-height: var(--case-preview-footer-min);
  max-height: min(38vh, 280px);
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: 2;
  padding: 12px 24px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case-preview__desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.case-preview__template-label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
}

.case-preview__template-code {
  margin: 0;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.55;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.case-preview__template-code code {
  font-family: inherit;
  font-size: inherit;
}

/* ---- 过渡动画 ---- */
.case-fade-enter-active,
.case-fade-leave-active {
  transition: opacity 0.2s ease;
}

.case-fade-enter-from,
.case-fade-leave-to {
  opacity: 0;
}

/* ---- 响应式 ---- */
@media (max-width: 640px) {
  .case-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .case-preview__inner {
    --case-preview-header-h: 64px;
    --case-preview-footer-min: 80px;
    border-radius: 12px;
  }

  .case-preview__inner--tall-asset {
    /* 为竖长图多挤出中间可视滚动区，减轻头尾「挡住」长图两端的感受 */
    --case-preview-header-h: 56px;
    --case-preview-footer-min: 72px;
  }

  .case-preview__header {
    padding: 0 48px 0 16px;
  }

  .case-preview__scroll {
    padding: 12px 16px;
  }

  .case-preview__scroll--tall-asset {
    padding-left: 8px;
    padding-right: 8px;
  }

  .case-preview__img-wrap--tall {
    max-width: min(100%, 400px);
  }

  .case-preview__footer {
    padding: 10px 16px 12px;
  }

  .case-preview__inner--tall-asset .case-preview__footer {
    padding: 8px 14px 10px;
  }
}
</style>
