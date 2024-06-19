import {ApiRenderApiType, getApiRenderCache} from "../ApiRenderCache";
import {ref} from "vue";

/**
 * 生成 select、radio、checkbox 等组件所需数据
 * @param api api 请求函数
 * @param options 参数配置
 * @param options.apiKey api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
 * @param options.labelKey 数据中要显示的名称的属性名，默认 label
 * @param options.valueKey 数据中 value 属性名，默认 value
 * @param options.dataLabelKey 生成数据中的要显示的名称的属性名，默认 label
 * @param options.dataValueKey 生成数据中的 value 属性名，默认 value
 */
export function useApiRenderOptions(api: ApiRenderApiType, options: {
    // api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
    apiKey?: string | number,
    // 数据中要显示的名称的属性名，默认 label
    labelKey?: string,
    // 数据中 value 属性名，默认 value
    valueKey?: string,
    // 生成数据中的要显示的名称的属性名，默认 label
    dataLabelKey?: string,
    // 生成数据中的 value 属性名，默认 value
    dataValueKey?: string,
}) {
    const apiRenderOptionsData = ref([])

    let {apiKey, labelKey, valueKey, dataLabelKey, dataValueKey} = options || {}

    labelKey = labelKey || 'label'
    valueKey = valueKey || 'value'
    dataLabelKey = dataLabelKey || 'label'
    dataValueKey = dataValueKey || 'value'

    getApiRenderCache<any[]>(api, apiKey).then(res => {
        if (!res) return
        let list = res

        if (dataLabelKey !== labelKey || dataValueKey !== valueKey) {
            list = res.map(item => {
                const obj = {}
                if (dataLabelKey !== labelKey) {
                    obj[dataLabelKey] = item[labelKey]
                }
                if (dataValueKey !== valueKey) {
                    obj[dataValueKey] = item[valueKey]
                }
                return obj
            })
        }
        apiRenderOptionsData.value = list
    })

    return {
        apiRenderOptionsData
    }
}
