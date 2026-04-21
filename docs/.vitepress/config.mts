import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
// 部署地址：https://wibetter.github.io/neo-cmp-docs/html
const base = '/neo-cmp-docs/html/'

export default defineConfig({
  base,
  outDir: '../html',
  assetsDir: './assets',
  title: '自定义组件开发手册',
  description:
    '自定义组件开发使用说明，涵盖 CLI、组件开发规范、设计器属性、数据源、上下文、联动与常见问题等',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        // head 中的 href 不会自动加 base，需与上面 base 保持一致
        href: `${base}assets/img/favicon.ico`,
      },
    ],
  ],
  themeConfig: {
    logo: `/assets/img/nex-logo.png`,
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'CLI',
        items: [
          { text: '快速开始', link: '/快速开始' },
          { text: '使用说明', link: '/CLI使用说明' },
        ],
      },
      { text: '组件开发规范', link: '/组件开发规范' },
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '快速开始', link: '/快速开始' },
          { text: 'CLI使用说明', link: '/CLI使用说明' },
          { text: '组件开发规范', link: '/组件开发规范' },
          { text: '可用属性配置项', link: '/可用属性配置项' },
          { text: '平台实体数据源', link: '/平台实体数据源' },
          { text: '平台自定义API', link: '/平台自定义API' },
          { text: '环境变量与工具函数', link: '/环境变量与工具函数' },
          { text: '事件动作机制', link: '/事件动作机制' },
          { text: '组件模块共享', link: '/组件模块共享' },
          {
            text: '平台组件使用',
            items: [
              { text: 'H5版 列表组件使用说明', link: '/cmpDocs/H5版列表组件使用说明' },
              { text: 'PC版 列表组件使用说明', link: '/cmpDocs/PC版列表组件使用说明' },
            ],
          },
          { text: '常见问题', link: '/常见问题' }
        ],
      },
    ],
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/wibetter/neo-cmp-docs' }],
  },
})
