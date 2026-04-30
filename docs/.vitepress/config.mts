import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
// 部署地址：https://wibetter.github.io/neo-cmp-docs/html
// const base = '/neo-cmp-docs/html/'; // github pages 部署地址

const base = '/'; // netlify pages 部署地址

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
        href: `${base}img/favicon.ico`,
      },
    ],
    // 百度统计：public/js/tongji.js，构建后每个 HTML 页面 head 中都会引入
    ['script', { src: `${base}js/tongji.js` }],
  ],
  themeConfig: {
    logo: `/img/nex-logo.png`, // 会自动加 base
    search: {
      provider: 'local'
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'CLI',
        items: [
          { text: '使用说明', link: '/guide/CLI使用说明' },
          { text: '版本列表', link: 'https://www.npmjs.com/package/neo-cmp-cli?activeTab=versions' },
          { text: '使用反馈', link: 'https://github.com/xsy-neoui/neo-cmp-docs/issues' },
        ],
      },
      { text: '示例模板', link: '/示例模板' },
      { text: '案例展示', link: '/案例展示' },
    ],
    sidebar: [
      {
        text: '开发手册',
        items: [
          { text: '安装', link: '/guide/安装' },
          { text: '快速开始', link: '/guide/快速开始' },
          { text: 'CLI使用说明', link: '/guide/CLI使用说明' },
          { text: '组件开发规范', link: '/guide/组件开发规范' },
          {
            text: '动态数据源',
            items: [
              { text: '平台实体数据源', link: '/datasource/平台实体数据源' },
              { text: '平台自定义API', link: '/datasource/平台自定义API' },
            ],
          },
          {
            text: '工具和方法',
            items: [
              { text: '组件运行时上下文', link: '/tools/组件运行时上下文' },
              { text: '事件动作机制', link: '/tools/事件动作机制' },
              { text: '组件模块共享', link: '/tools/组件模块共享' },
            ],
          },
          {
            text: '组件属性配置项',
            items: [
              { text: '表单类配置项', link: '/config/表单类配置项' },
              { text: '数据源类配置项', link: '/config/数据源类配置项' },
              { text: '自定义配置项开发', link: '/config/自定义配置项开发' },
            ],
            link: '/config/组件属性配置项'
          },
          {
            text: '使用平台组件',
            items: [
              { text: 'H5版 列表组件使用说明', link: '/cmpDocs/H5版列表组件使用说明' },
              { text: 'H5版 全局搜索组件使用说明', link: '/cmpDocs/H5版全局搜索组件使用说明' },
              { text: 'PC版 列表组件使用说明', link: '/cmpDocs/PC版列表组件使用说明' },
            ],
            link: '/使用平台组件'
          },
          { text: '常见问题', link: '/常见问题' }
        ],
      },
    ],
    outline: {
      label: '快速导航',
      level: [2, 3],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xsy-neoui/neo-cmp-docs' }],
  },
})
