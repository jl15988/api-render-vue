# api-render-vue

[![License](https://img.shields.io/npm/l/api-render-vue?color=5470c6)](https://github.com/jl15988/api-render-vue/blob/master/LICENSE) [![Latest npm release](https://img.shields.io/npm/v/api-render-vue?color=91cc75)](https://www.npmjs.com/package/api-render-vue) [![NPM downloads](https://img.shields.io/npm/dm/api-render-vue.svg?label=npm%20downloads&style=flat&color=fac858)](https://www.npmjs.com/package/api-render-vue)

一个 api 数据渲染组件，通过定义 api 项及各项配置，可实现自动异步获取 api 数据，然后通过值匹配名称渲染到页面，实现前端`字典`的统一管理，且不仅仅是字典

## 优点

1. 组件化，使用简单，通过 vue 组件传入 apiKey 及 value 即可自动`异步`获取数据且渲染
2. 数据缓存，每次使用数据优先使用缓存数据（相当于状态数据，不会保存到浏览器本地，如果浏览器刷新，则会重新获取），可配置缓存`有效期`，超期重新获取，或者手动刷新缓存
3. 统一配置，可自定义各项配置及 api 项，便于维护

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

## 使用

创建 apiRender.ts

```ts
import axios from "axios";
import {defineApiRender} from "api-render-vue";

const apiRenderOptions = defineApiRender({
    getUser: {
        api: async () => {
            const res = await axios.get('http://localhost:8080/common/getData')
            return res.data
        },
        labelKey: 'name'
    }
})

export default apiRenderOptions
```

然后再页面中使用

```vue
<template>
  <div class="home">
    <api-render :api-key="apiRenderOptions.keys.getUser" value="20"></api-render>
  </div>
</template>

<script lang="ts" setup>
import ApiRender from "api-render-vue";
import apiRenderOptions from "@/apiRender";
</script>
```


apiRenderOptions 中的属性

| 属性                      | 参数                                                                                                    | 描述                     |
|-------------------------|-------------------------------------------------------------------------------------------------------|------------------------|
| keys                    | 无                                                                                                     | api 项的关键字映射            |
| renderApiValue          | apiKey： api 的 option 关键字，param： value 要匹配的 value 值，valueKey： 要匹配的数据 value 关键字，labelKey： 返回的 label 关键字 | 解析 api 数据，匹配值，返回 label |
| renderApiOptions        | apiKey： api 的 option 关键字，options： 配置项                                                                 | 解析 api 数据为选择项数据        |
| renderApiTree           | apiKey： api 的 option 关键字，options： 配置项                                                                 | 解析 api 数据为树结构数据        |
| reloadApiRenderOptionsData | apiKeys 要重载的 api 项 key                                                                                | 重新加载 api 项数据           |

## 统一模板

定义统一模板
```ts
export const apiRenderTemplates = defineApiRenderTemplates({
    elSelect: (value, prop, data) => {
        const childs = []
        if (data) {
            for (let datum of data) {
                childs.push(h(ElOption, {
                    value: datum.value,
                    label: datum.name,
                    key: datum.value
                }))
            }
        }
        return childs
    }
})
```
然后在

## 属性

| 属性                   | 参数                                                         | 描述                                |
|----------------------|------------------------------------------------------------|-----------------------------------|
| defineApiRender      | id：定义的 id 值（可选），当定义多个 api 项时，用以区分，否则将会覆盖，options：定义的 api 项 | 定义 api 项，使用组件时，可传入 apiKey 来自动获取数据 |
| reloadApiRenderCache | apiKeys：要加载的 api 缓存的 key                                   | 重新加载 api 缓存                       |
| setApiRenderConfig   | config：配置项                                                 | 设置全局配置项                           |
| getApiRenderConfig   | 无                                                          | 获取配置                              |
| defineApiRenderTemplates                     | templates：模板                                               | 定义统一模板，传入组件对应的 name 可渲染模板函数返回的内容  |
