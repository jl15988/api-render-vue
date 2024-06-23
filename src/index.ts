import {apiOptionsMap, defineApiRender} from "./options/ApiRenderOptions";
import {getApiRenderCache, reloadApiRenderCache, setApiRenderCache} from './ApiRenderCache'
import ApiRenderTool from "./ApiRenderTool";
import {getApiRenderConfig, setApiRenderConfig} from "./ApiRenderConfig";
import ArrayUtil from "./utils/ArrayUtil";
import ObjectUtil from "./utils/ObjectUtil";
import TreeUtil from "./utils/TreeUtil";
import {computed, defineComponent} from "vue";
import {renderApiValueByOptionsAsync} from "./options/renderApiRenderValue";

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
        }
    },
    setup(props) {
        const {apiKey, value} = props
        const renderValue = computed(() => {
            return renderApiValueByOptionsAsync(apiOptionsMap, apiKey, value)
        })
        return () => renderValue.value
    }
})

export {
    defineApiRender,
    setApiRenderCache,
    getApiRenderCache,
    reloadApiRenderCache,
    ApiRenderTool,
    setApiRenderConfig,
    getApiRenderConfig,
    ApiRenderUtils
}

export default ApiRender
