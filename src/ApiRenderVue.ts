import {computed, defineComponent} from "vue";
import {getTemplate} from "./ApiRenderTemplate";
import {apiMapRef, apiOptionsMap, getApiDataIfNot, getLabelKey, getValueKey} from "./options/ApiRenderOptions";
import ApiRenderUtil from "./ApiRenderTool";

export type ApiRenderProps = {
    /**
     * api 键
     */
    apiKey: string,
    /**
     * 匹配值
     */
    value: string | number | boolean,
    /**
     * 模板名称
     */
    templateName: string
}

export const ApiRender = defineComponent({
    name: 'ApiRender',
    props: {
        /**
         * api 项 id
         */
        id: {
            type: [String],
            required: true
        },
        /**
         * 匹配值
         */
        value: {
            type: [String, Number, Boolean]
        },
        /**
         * 模板名称
         */
        templateName: String,
        /**
         * 绑定值
         */
        modelValue: [String, Number, Boolean, Object]
    },
    setup(props, {emit}) {
        const {id, value, templateName} = props
        // 获取数据
        getApiDataIfNot(apiOptionsMap, id)
        const renderValue = computed(() => {
            // 获取结果值
            let resValue = ''
            const res = apiMapRef.value[id]
            if (res) {
                const item = ApiRenderUtil.getItemByValue(res, value, getValueKey(id))
                resValue = ApiRenderUtil.renderValueByItem(item, getLabelKey(id))
            }
            // 获取模板函数
            const renderFun = getTemplate(templateName)
            return renderFun({
                value: resValue,
                // @ts-ignore
                prop: props,
                data: apiMapRef.value[id],
                modelValue: props.modelValue,
                modelBack(value: any) {
                    emit('update:modelValue', value)
                },
            })
        })
        return () => renderValue.value
    },
})
