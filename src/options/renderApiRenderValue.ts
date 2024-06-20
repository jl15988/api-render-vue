import ApiRenderUtil from "../ApiRenderTool";
import {
    apiMapRef,
    ApiRenderOptionsType,
    getApiDataIfNot,
    getApiMapRefValue,
    getLabelKey,
    getValueKey
} from "./ApiRenderOptions";
import {computed} from "vue";

export function renderApiValueByOptions<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) {
    getApiDataIfNot(apiOptions, apiKey)
    return computed(() => {
        const res = apiMapRef.value[apiKey]
        if (!res) return ''
        labelKey = getLabelKey(apiKey, labelKey)
        valueKey = getValueKey(apiKey, valueKey)
        const item = ApiRenderUtil.getItemByValue(res, value, valueKey)
        return ApiRenderUtil.renderValueByItem(item, labelKey)
    })
}
