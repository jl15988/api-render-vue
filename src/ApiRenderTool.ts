import {ApiRenderApiType, getApiRenderCache} from "./ApiRenderCache";
import apiRenderConfig from "./ApiRenderConfig";
import ObjectUtil from "./utils/ObjectUtil";

class ApiRenderTool {
    /**
     * 匹配数组中对应值相等的项，如果是对象，则返回 valueKey 对应的值
     * @param arr 数组
     * @param valueKey value 关键字
     * @param value 匹配的 value 值
     */
    getItemByValue<T>(arr: T[] | T, value: any, valueKey?: string): T | undefined {
        valueKey = valueKey || apiRenderConfig.defaultValueKey
        if (Array.isArray(arr)) {
            return arr.find((item) => item[valueKey] === value)
        }
        return arr[valueKey]
    }

    /**
     * 通过 value 匹配获取 pai 数组数据中对应的项，如果数据为对象，则返回 valueKey 对应的值
     * @param api 请求的 api 函数
     * @param valueKey value关键字
     * @param value 匹配的 value 值
     * @param apiKey api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
     */
    async getApiItem<T>(
        api: ApiRenderApiType,
        valueKey: string,
        value: any,
        apiKey?: string
    ): Promise<T | undefined> {
        const res = await getApiRenderCache<T[] | T>(api, apiKey)
        if (res) {
            return this.getItemByValue<T>(res, value, valueKey)
        }
        return undefined
    }

    /**
     * 解析项，判断项类型，如果项是对象，则返回 label 字段值，否则直接返回，如果项为空，则返回空字符串，未
     * @param item
     * @param labelKey
     */
    renderValueByItem(item?: any, labelKey?: string | number) {
        if (ObjectUtil.isEmpty(item)) return ''
        if (typeof item === 'object') {
            const value = item[labelKey || apiRenderConfig.defaultLabelKey]
            return ObjectUtil.defaultIfNotBoolean(value)
        } else {
            return ObjectUtil.defaultIfNotBoolean(item)
        }
    }

    /**
     * 解析 api 获取到的数据，通过 valueKey 和 value 匹配对应的项，然后返回该项的 labelKey 字段对应的值，默认返回空字符串
     * <p>这里存在两种情况</p>
     * - api 返回的数据是数组，则通过遍历数组找到 valueKey 对应值为 value 的项，然后返回 labelKey 对应的值
     * - api 返回的数据是对象，则找到 valueKey 字段对应的值作为项，如果项是一个对象，则返回 labelKey 对应的值，否则直接返回
     * @param api 请求的 api 函数
     * @param valueKey value关键字
     * @param value 匹配的 value 值
     * @param labelKey 最终解析返回的字段
     * @param apiKey api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
     */
    async renderValue(api: ApiRenderApiType, valueKey: string, value: any, labelKey?: string, apiKey?: string) {
        const item = await this.getApiItem(api, valueKey, value, apiKey)
        this.renderValueByItem(item, labelKey)
    }

    /**
     * 解析 api 获取到的数据（只能是数组）为选项，如 select、radio 等组件需要的数据
     * <p>生成如下的数据结构</p>
     * ```js
     * [{
     *  label: '',
     *  value: '',
     *  key: ''
     * }]
     * ```
     * @param api 请求的 api 函数
     * @param valueKey value关键字
     * @param labelKey 最终解析返回的字段
     * @param apiKey api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
     */
    async renderOptions<T>(api: ApiRenderApiType, valueKey?: string, labelKey?: string, apiKey?: string) {
        const list = await getApiRenderCache<T[]>(api, apiKey)
        return list.map(item => {
            return {
                label: item[labelKey || apiRenderConfig.defaultLabelKey],
                value: item[valueKey || apiRenderConfig.defaultValueKey],
                key: item[valueKey || apiRenderConfig.defaultValueKey],
            }
        })
    }
}

export default new ApiRenderTool()
