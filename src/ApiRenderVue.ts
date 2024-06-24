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
         * api 键
         */
        apiKey: {
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
        modelValue: [String, Number, Boolean, Object]
    },
    setup(props) {
        const emits = defineEmits(['update:modelValue']);
        const {apiKey, value, templateName} = props
        // 获取数据
        getApiDataIfNot(apiOptionsMap, apiKey)
        const renderValue = computed(() => {
            // 获取结果值
            let resValue = ''
            const res = apiMapRef.value[apiKey]
            if (res) {
                const item = ApiRenderUtil.getItemByValue(res, value, getValueKey(apiKey))
                resValue = ApiRenderUtil.renderValueByItem(item, getLabelKey(apiKey))
            }
            // 获取模板函数
            const renderFun = getTemplate(templateName)
            return renderFun({
                value: resValue,
                // @ts-ignore
                prop: props,
                data: apiMapRef.value[apiKey],
                modelValue: props.modelValue,
                modelBack(value: any) {
                    emits('update:modelValue', value)
                },
            })
        })
        return () => renderValue.value
    },
})
