# api-render-vue

[![License](https://img.shields.io/npm/l/api-render-vue?color=5470c6)](https://github.com/jl15988/api-render-vue/blob/master/LICENSE) [![Latest npm release](https://img.shields.io/npm/v/api-render-vue?color=91cc75)](https://www.npmjs.com/package/api-render-vue) [![NPM downloads](https://img.shields.io/npm/dm/api-render-vue.svg?label=npm%20downloads&style=flat&color=fac858)](https://www.npmjs.com/package/api-render-vue)

一个 api 数据渲染组件，通过定义 api 项及各项配置，可实现自动异步获取 api 数据，然后通过值匹配名称渲染到页面，实现前端`字典`的统一管理，且不仅仅是字典

## 优点

1. 组件化，[使用简单](./documents/SIMPLE.MD)，通过 vue 组件传入 apiKey 及 value 即可自动`异步`获取数据且渲染
2. [统一模版](./documents/COMMON_TEMPLATE.md)，通过配置统一模版可实现在页面中自动渲染指定组件，支持数据的双向绑定，实现组件统一配置，统一管理
3. 数据缓存，每次使用数据优先使用缓存数据（相当于状态数据，不会保存到浏览器本地，如果浏览器刷新，则会重新获取），可配置缓存`有效期`，超期重新获取，或者手动刷新缓存
4. 统一配置，可自定义各项配置及 api 项，便于维护

## 安装

npm 安装
```sh
npm i api-render-vue -S
```

yarn 安装
```sh
yarn add api-render-vue -S
```

pnpm 安装
```sh
pnpm i api-render-vue -S
```

## 属性及API

见 [属性文档](./documents/ATTRIBUTE.md) 或 [API文档](https://jl15988.github.io/api-render-vue/)
