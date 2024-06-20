import {
    ApiRenderOptionsType,
    getApiDataIfNot,
    getApiMapRefValue,
    getLabelKey,
    getOptionsLabelKey,
    getOptionsValueKey,
    getValueKey
} from "./ApiRenderOptions";

export type ApiRenderOptionsOptionType = {
    /**
     * 数据中值的属性名
     */
    valueKey?: string
    /**
     * 数据中名称的属性名
     */
    labelKey?: string
    /**
     * 生成的数据中值的属性名
     */
    dataValueKey?: string
    /**
     * 生成的数据中名称的属性名
     */
    dataLabelKey?: string
}

export function renderApiOptionsByOptions<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, options: ApiRenderOptionsOptionType): any {
    getApiDataIfNot(apiOptions, apiKey)
    const res = getApiMapRefValue(apiKey)
    if (!res || !Array.isArray(res)) return []
    let {valueKey, labelKey, dataValueKey, dataLabelKey} = options
    labelKey = getLabelKey(apiKey, labelKey)
    valueKey = getValueKey(apiKey, valueKey)
    dataValueKey = getOptionsValueKey(apiKey, dataValueKey)
    dataLabelKey = getOptionsLabelKey(apiKey, dataLabelKey)
    return res.map(item => {
        return {
            [dataLabelKey]: item[labelKey],
            [dataValueKey]: item[valueKey],
            key: item[valueKey]
        }
    })
}
