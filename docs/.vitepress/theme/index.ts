import type { Theme } from 'vitepress'
// 官方默认主题（含 Layout、增强能力等），作为扩展基础
import DefaultTheme from 'vitepress/theme'
// 自定义根布局：在默认 Layout 上挂插槽（如 layout-bottom 里的首页二维码浮层）
import Layout from './Layout.vue'
// 全局样式：右下角可拖拽二维码（neo-qr-fab）等
import './neo-qr-fab.css'

/**
 * 自定义主题入口
 * 通过 `extends` 继承默认主题，仅覆盖需要自定义的 `Layout`；
 * 其余行为与 VitePress 默认主题一致。
 * 官方文档：https://vitepress.dev/zh/guide/custom-theme
 */
export default {
  /** 继承默认主题的全部增强与组件 */
  extends: DefaultTheme,
  /** 使用自定义根布局组件，向主题提供插槽内容 */
  Layout,
} satisfies Theme
