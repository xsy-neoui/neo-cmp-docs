---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 自定义组件开发手册
  # text: CLI、设计器属性、Neo 数据源、上下文与组件联动等完整说明
  tagline: 含CLI、事件动作机制、平台实体数据源、模块共享、环境变量与工具函数等使用说明
  actions:
    - theme: brand
      text: 开始阅读
      link: /CLI使用说明
    - theme: alt
      text: 组件开发规范
      link: /组件开发规范
    - theme: alt
      text: 常见问题
      link: /常见问题
features:
  - title: CLI 使用
    details: 提供自定义组件模板、调试、授权登录、发布等功能命令
    link: /CLI使用说明
  - title: 平台实体数据源
    details: 可在自定义组件中访问平台实体数据源，用于查询或写入业务对象数据。
    link: /平台实体数据源
  - title: 事件动作机制
    details: 通过事件动作实现自定义组件之间数据联动和交互响应
    link: /事件动作机制
  - title: 组件模块共享
    details: 自定义组件间通过模块联邦方式进行模块共享
    link: /组件模块共享
---
