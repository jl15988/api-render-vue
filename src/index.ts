import {defineApiRenderOptions} from "./options/ApiRenderOptions";
import {getApiRenderCache, reloadApiRenderCache, setApiRenderCache} from './ApiRenderCache'
import ApiRenderTool from "./ApiRenderTool";
import ApiRenderValues from "./values";
import {getApiRenderConfig, setApiRenderConfig} from "./ApiRenderConfig";
import ArrayUtil from "./utils/ArrayUtil";
import ObjectUtil from "./utils/ObjectUtil";
import TreeUtil from "./utils/TreeUtil";

const ApiRenderUtils = {
    ArrayUtil,
    ObjectUtil,
    TreeUtil
}

const apiRenderVue = ApiRenderValues
export default apiRenderVue;

export {
    defineApiRenderOptions,
    setApiRenderCache,
    getApiRenderCache,
    reloadApiRenderCache,
    ApiRenderTool,
    setApiRenderConfig,
    getApiRenderConfig,
    ApiRenderUtils
}
