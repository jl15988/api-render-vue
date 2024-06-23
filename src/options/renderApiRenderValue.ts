import ApiRenderUtil from "../ApiRenderTool";
import {apiMapRef, ApiRenderOptionsType, getApiDataIfNot, getLabelKey, getValueKey} from "./ApiRenderOptions";

export async function renderApiValueByOptions<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) {
    await getApiDataIfNot(apiOptions, apiKey)
    const res = apiMapRef.value[apiKey]
    if (!res) return ''
    labelKey = getLabelKey(apiKey, labelKey)
    valueKey = getValueKey(apiKey, valueKey)
    const item = ApiRenderUtil.getItemByValue(res, value, valueKey)
    return ApiRenderUtil.renderValueByItem(item, labelKey)
}

export function renderApiValueByOptionsAsync<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) {
    getApiDataIfNot(apiOptions, apiKey)
    const res = apiMapRef.value[apiKey]
    if (!res) return ''
    labelKey = getLabelKey(apiKey, labelKey)
    valueKey = getValueKey(apiKey, valueKey)
    const item = ApiRenderUtil.getItemByValue(res, value, valueKey)
    return ApiRenderUtil.renderValueByItem(item, labelKey)
}
