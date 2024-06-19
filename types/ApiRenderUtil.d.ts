import { ApiRenderApiType } from "./ApiRenderCache";
declare class ApiRenderUtil {
    /**
     * 匹配数组中对应值相等的项，如果是对象，则返回 valueKey 对应的值
     * @param arr 数组
     * @param valueKey value 关键字
     * @param value 匹配的 value 值
     */
    getItemByValue<T>(arr: T[] | T, valueKey: string, value: any): T | undefined;
    /**
     * 通过 value 匹配获取 pai 数组数据中对应的项，如果数据为对象，则返回 valueKey 对应的值
     * @param api 请求的 api 函数
     * @param valueKey value关键字
     * @param value 匹配的 value 值
     * @param apiKey api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
     */
    getApiItem<T>(api: ApiRenderApiType, valueKey: string, value: any, apiKey?: string): Promise<T | undefined>;
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
    renderValue(api: ApiRenderApiType, valueKey: string, value: any, labelKey: string, apiKey?: string): Promise<any>;
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
    renderOptions<T>(api: ApiRenderApiType, valueKey: string, labelKey: string, apiKey?: string): Promise<{
        label: any;
        value: any;
        key: any;
    }[]>;
}
declare const _default: ApiRenderUtil;
export default _default;
