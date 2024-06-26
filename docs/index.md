---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "API Render Vue"
  text: "一个 API 数据渲染工具"
  tagline: Make your data rendering more standardized.
  image:
    src: /logo.png
    alt: ApiRender
  actions:
    - theme: brand
      text: 查看 API
      link: /api
    - theme: alt
      text: 查看源码
      link: https://github.com/jl15988/api-render-vue

features:
  - title: 组件化
    details: 通过组件传入 apiKey 及 value 即可自动异步获取数据且渲染
  - title: 统一模版
    details: 通过配置统一模版可实现在页面中自动渲染指定组件，支持数据的双向绑定，实现组件统一配置，统一管理
  - title: 数据缓存
    details: 每次使用数据优先使用缓存数据（相当于状态数据，刷新页面会重新获取），可自定义缓存有效期，或者手动刷新缓存
---

