import {apiMapRef, apiOptionsMap, defineApiRender} from "./options/ApiRenderOptions";
import {getApiRenderCache, reloadApiRenderCache, setApiRenderCache} from './ApiRenderCache'
import ApiRenderTool from "./ApiRenderTool";
import {getApiRenderConfig, setApiRenderConfig} from "./ApiRenderConfig";
import ArrayUtil from "./utils/ArrayUtil";
import ObjectUtil from "./utils/ObjectUtil";
import TreeUtil from "./utils/TreeUtil";
import {computed, defineComponent} from "vue";
import {renderApiValueByOptionsAsync} from "./options/renderApiRenderValue";
import {apiRenderTemplate, setApiRenderTemplates} from "./ApiRenderTemplate";

const ApiRenderUtils = {
    ArrayUtil,
    ObjectUtil,
    TreeUtil
}

const ApiRender = defineComponent({
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
        templateName: String
    },
    setup(props) {
        const {apiKey, value, templateName} = props
        const renderValue = computed(() => {
            let renderFun = (value: any, prop: typeof props, data?: any) => {
                return value
            }
            if (templateName) {
                const templateFun = apiRenderTemplate[templateName]
                if (templateFun) {
                    renderFun = templateFun
                }
            }
            const resValue = renderApiValueByOptionsAsync(apiOptionsMap, apiKey, value);
            return renderFun(resValue, props, apiMapRef.value[apiKey])
        })
        return () => renderValue.value
    },
})

export {
    defineApiRender,
    setApiRenderCache,
    getApiRenderCache,
    reloadApiRenderCache,
    ApiRenderTool,
    setApiRenderConfig,
    getApiRenderConfig,
    ApiRenderUtils,
    setApiRenderTemplates
}

export default ApiRender
