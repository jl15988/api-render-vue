import {defineApiRender} from "./options/ApiRenderOptions";
import {getApiRenderCache, reloadApiRenderCache, setApiRenderCache} from './ApiRenderCache'
import ApiRenderTool from "./ApiRenderTool";
import {getApiRenderConfig, setApiRenderConfig} from "./ApiRenderConfig";
import ArrayUtil from "./utils/ArrayUtil";
import ObjectUtil from "./utils/ObjectUtil";
import TreeUtil from "./utils/TreeUtil";
import {defineApiTemplates} from "./ApiRenderTemplate";
import {ApiRender} from "./ApiRenderVue";

const ApiRenderUtils = {
    ArrayUtil,
    ObjectUtil,
    TreeUtil
}

export {
    defineApiRender,
    setApiRenderCache,
    getApiRenderCache,
    reloadApiRenderCache,
    ApiRenderTool,
    setApiRenderConfig,
    getApiRenderConfig,
    ApiRenderUtils,
    defineApiTemplates
}

export default ApiRender
