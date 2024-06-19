import {ApiRenderApiType, getApiRenderCache} from "../ApiRenderCache";
import {ref} from "vue";
import ApiRenderUtil from "../ApiRenderUtil";

const defaultLabelKey = 'label'
const defaultValueKey = 'value'

export function useApiRenderValue<T extends {
    [key: string]: {
        valueKey?: string
        labelKey?: string
        api: ApiRenderApiType
    } | ApiRenderApiType
}>(loadApis: T) {
    const keyMap: {
        [key: string | number | symbol]: {
            valueKey: string
            labelKey: string
        }
    } = {}

    const apiMap = ref<{
        [key: string | number | symbol]: any | any[]
    }>({})

    for (let loadApisKey in loadApis) {
        const api = loadApis[loadApisKey];
        if (api instanceof Function) {
            getApiRenderCache<any | any[]>(api).then(res => {
                apiMap.value[loadApisKey] = res
            })
        } else {
            keyMap[loadApisKey] = {
                labelKey: api.labelKey || defaultLabelKey,
                valueKey: api.valueKey || defaultValueKey
            }
        }
    }

    function getLabelKey(apiKey: string | number | symbol, labelKey?: string): string {
        if (labelKey) return labelKey
        if (keyMap[apiKey]) return keyMap[apiKey].labelKey
    }

    function getValueKey(apiKey: string | number | symbol, valueKey?: string): string {
        if (valueKey) return valueKey
        if (keyMap[apiKey]) return keyMap[apiKey].valueKey
    }

    function renderApiValue(apiKey: keyof T, value: any, valueKey: string = defaultValueKey, labelKey: string = defaultLabelKey) {
        const res = apiMap.value[apiKey]
        if (!res) return ''
        valueKey = getValueKey(apiKey, valueKey)
        labelKey = getLabelKey(apiKey, labelKey)
        const item = ApiRenderUtil.getItemByValue(res, valueKey, value)
        if (!item) return ''
        if (typeof item === 'object') {
            return item[labelKey] || ''
        } else {
            return item || ''
        }
    }

    return {
        renderApiValue
    }
}
