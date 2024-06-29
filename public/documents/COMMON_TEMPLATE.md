# 统一模版

通过匹配统一模版，可以将相同的组件代码统一配置，然后指定渲染，实现组件的统一配置、统一维护，避免大量的类似组件，且便于维护

## 定义统一模版

创建 apiRenderTemplates.tsx

```tsx
import {defineApiTemplates} from "api-render-vue";
import {h} from "vue";
import {ElOption, ElSelect} from "element-plus";

export const apiRenderTemplates = defineApiTemplates({
    elSelect: ({data, modelValue, modelBack}) => {
        const childs = []
        if (data) {
            for (let datum of data) {
                childs.push(h(ElOption, {
                    label: datum.name,
                    value: datum.value,
                    key: datum.value
                }))
            }
        }
        return h(ElSelect, {
            modelValue: modelValue,
            onChange: (val) => {
                modelBack && modelBack(val)
            }
        }, childs)
    },
    elSelect2: function (params: { data: IUser[], modelValue: string, modelBack: (value: string) => any }) {
        const {data, modelValue, modelBack} = params;
        return (
            <ElSelect modelValue={modelValue} onChange={(e: string) => modelBack && modelBack(e)}>
                {
                    data ?
                        data.map((item: any) => (
                            <ElOption key={item.value} value={item.value} label={item.name}></ElOption>
                        )) : ''
                }
            </ElSelect>
        )
    }
})
```

如上，通过 defineApiTemplates 定义了两个模版，这两个模版其实效果是一样的，一个使用 h 函数，一个使用 jsx，从组件化上来看，推荐使用 jsx，h 函数可能会有某些警告，且性能可能不太好，如果为简单的组件，可以使用，可个人习惯吧

当然，你可以指定 id 来划分不同模版

```tsx
export const selectApiTemplates = defineApiTemplates('select', {
    // 模版配置...
})
```

## 页面中使用

```vue
<template>
  <div class="home">
    <!-- 按模版渲染 -->
    <api-render
      :id="apiRenders.ids.getUser"
      :template-name="apiRenderTemplates.ids.elSelect"
      v-model="selectValue">
    </api-render>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ApiRender from "api-render-vue";
import apiRenders from "@/apiRenders";
import apiRenderTemplates from "@/apiRenderTemplates"
  
const selectValue = ref('')
</script>
```

如上，在使用 api-render 组件时，指定 templateName 属性，即可渲染指定模版内容（这里的 ids 与[简单使用](SIMPLE.MD)中的 ids 相同）
