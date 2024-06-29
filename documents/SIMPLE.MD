# 简单使用

apiRender 通过配置 apiOption 来完成 api 的统一配置，然后根据 apiKey 来渲染出最终结果

## 配置 apiOption

创建 apiRenders.ts

```ts
import axios from "axios";
import {getUserType} from "@/api/userType";
import {defineApiRender} from "api-render-vue";

export const apiRenders = defineApiRender({
    getUserType,
    getUser: {
        api: async () => {
            const res = await axios.get('http://localhost:8080/common/getData')
            return res.data
        },
        labelKey: 'name'
    }
})
```

如上，你可以直接传入一个返回 Promise 的方法，也可以配置更多配置项，指定 labelKey 或 valueKey 等，这些配置也都可以在 setApiRenderConfig 中统一指定

如果你想将不同的 api 放到不同的文件中，可以指定 id

```ts
export const userApiRender = defineApiRender('user', {
    // api 配置
})
```

## 页面使用

在 vue 页面中使用该 api 渲染

```vue
<template>
  <!-- 通过 value 渲染名称 -->
  <api-render :id="apiRenders.ids.getUser" value="20"></api-render>
</template>

<script lang="ts" setup>
import ApiRender from "api-render-vue";
import {apiRenders} from "@/apiRenders";
</script>
```

如上，我们通过 api-render 组件，传入 getUser 的 apiKey，指定 value 即可自动匹配数据项，然后渲染 label 字段

每定义一个 apiRender，返回的结果中都会包含 ids 属性，这是 api 项 id 的映射，如果你不想使用它（实际上推荐使用前者，方便维护，且避免出现因 id 不正确而导致的不必要问题），可以直接传入 getUser，但如果你使用了 id 来定义 apiRender，则需要额外添加 id 值，通过 # 来间隔项 id，如：user#getUser
