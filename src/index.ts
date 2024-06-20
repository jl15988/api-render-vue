import {setApiRenderOptions} from "./options/ApiRenderOptions";
import {getApiRenderCache, reloadApiRenderCache, setApiRenderCache} from './ApiRenderCache'
import ApiRenderTool from "./ApiRenderTool";
import ApiRender from "./values";
import {getApiRenderConfig, setApiRenderConfig} from "./ApiRenderConfig";
import ArrayUtil from "./utils/ArrayUtil";
import ObjectUtil from "./utils/ObjectUtil";
import TreeUtil from "./utils/TreeUtil";

const ApiRenderUtils = {
    ArrayUtil,
    ObjectUtil,
    TreeUtil
}

export {
    setApiRenderOptions,
    setApiRenderCache,
    getApiRenderCache,
    reloadApiRenderCache,
    ApiRenderTool,
    setApiRenderConfig,
    getApiRenderConfig,
    ApiRenderUtils
}

const apiRenderVue = ApiRender
export default apiRenderVue;
