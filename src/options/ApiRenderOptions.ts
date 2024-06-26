import {ApiRenderApiType, getApiRenderCache, reloadApiRenderCache} from "../ApiRenderCache";
import {ref} from "vue";
import {renderApiValueByOptions} from "./renderApiRenderValue";
import apiRenderConfig from "../ApiRenderConfig";
import {ApiRenderTreeOptionType, renderApiTreeByOptions} from "./renderApiRenderTree";
import {ApiRenderOptionsOptionType, renderApiOptionsByOptions} from "./renderApiRenderOptions";

export type ApiRenderOptionsKeyConfigType = {
    /**
     * label 关键字，默认 label
     */
    labelKey: string
    /**
     * value 关键字，默认 value
     */
    valueKey: string
    /**
     * 树结构 label 关键字，默认 label
     */
    treeValueKey: string
    /**
     * 树结构 value 关键字，默认 value
     */
    treeLabelKey: string
    /**
     * 树结构主键关键字，默认 id
     */
    treeIdKey: string
    /**
     * 树结构子节点关键字，默认 children
     */
    treeChildrenKey: string
    /**
     * 树结构父级主键关键字，默认 parentId
     */
    treeParentIdKey: string
    /**
     * 选择项中值关键字，默认 value
     */
    optionsValueKey: string
    /**
     * 选择项中名称关键字，默认 label
     */
    optionsLabelKey: string
}

export type ApiRenderOptionsConfigType = Partial<ApiRenderOptionsKeyConfigType> & {
    api: ApiRenderApiType
}

export type ApiRenderOptionsType = Record<string, ApiRenderOptionsConfigType | ApiRenderApiType>

export const apiOptionsMap: ApiRenderOptionsType = {}

// api 响应式数据缓存
export const apiMapRef = ref<{
    [key: string | number | symbol]: any | any[]
}>({})
// 关键字映射
const keyMap: {
    [key: string | number | symbol]: ApiRenderOptionsKeyConfigType
} = {}

/**
 * 获取 api 响应式数据缓存值
 * @param apiKey api 数据缓存 key
 */
export function getApiMapRefValue(apiKey: string | number | symbol): any | any[] {
    return apiMapRef.value[apiKey]
}

/**
 * 获取默认的项配置
 */
export function getDefaultApiRenderOptionsConfig(): ApiRenderOptionsKeyConfigType {
    return {
        labelKey: apiRenderConfig.defaultLabelKey,
        valueKey: apiRenderConfig.defaultValueKey,
        treeValueKey: apiRenderConfig.defaultTreeValueKey,
        treeLabelKey: apiRenderConfig.defaultTreeLabelKey,
        treeIdKey: apiRenderConfig.defaultTreeIdKey,
        treeChildrenKey: apiRenderConfig.defaultTreeChildrenKey,
        treeParentIdKey: apiRenderConfig.defaultTreeParentIdKey,
        optionsValueKey: apiRenderConfig.defaultOptionsValueKey,
        optionsLabelKey: apiRenderConfig.defaultOptionsLabelKey,
    }
}

type DefineApiRenderResultType<P> = {
    /**
     * api 项的 id 映射
     */
    ids: { [key in keyof P]: string; };
    /**
     * 解析 api 数据，匹配值，返回 label
     * @param apiKey api 的 option 关键字
     * @param value 要匹配的 value 值
     * @param valueKey 要匹配的数据 value 关键字
     * @param labelKey 返回的 label 关键字
     */
    renderApiValue: (apiKey: keyof P, value: any, valueKey?: string, labelKey?: string) => Promise<any>;
    /**
     * 解析 api 数据为选择项数据
     * @param apiKey api 的 option 关键字
     * @param options 配置项
     */
    renderApiOptions: (apiKey: keyof P, options: ApiRenderOptionsOptionType) => any;
    /**
     * 解析 api 数据为树结构数据
     * @param apiKey api 的 option 关键字
     * @param options 配置项
     */
    renderApiTree: (apiKey: keyof P, options: ApiRenderTreeOptionType) => any[];
    /**
     * 重新加载 api 项数据
     * @param apiKeys 要重载的 api 项 key
     */
    reloadApiData: (...apiKeys: (keyof P)[]) => void;
}

/**
 * 定义 api 项
 * @param id 分包 ID
 * @param options api 项
 */
export function defineApiRender<D extends string, P extends ApiRenderOptionsType>(id: D, options: P): DefineApiRenderResultType<P>
/**
 * 定义 api 项
 * @param options api 项
 */
export function defineApiRender<P extends ApiRenderOptionsType>(options: P): DefineApiRenderResultType<P>

export function defineApiRender<D extends string, P extends ApiRenderOptionsType>(id: D | P, options: P = {} as P) {
    const apiId = typeof id === 'string' ? id : ''
    const apiOptions = typeof id === 'object' ? id : options
    type OptionsKeyMapType = {
        [key in keyof P]: string
    }
    const optionsIds: OptionsKeyMapType = {} as OptionsKeyMapType
    // 赋值默认值
    const defaultApiRenderOptionsConfig = getDefaultApiRenderOptionsConfig()
    for (let opsKey in apiOptions) {
        const apiOptionItem = apiOptions[opsKey]
        // 拼装 api 项 id
        const optionId = apiId ? apiId + '#' + opsKey : opsKey
        // 赋值默认配置
        keyMap[optionId] = getDefaultApiRenderOptionsConfig()
        if (typeof apiOptionItem === 'object') {
            // 缓存 api 配置
            const {api, ...optionsConfig} = apiOptionItem
            keyMap[optionId] = Object.assign({}, defaultApiRenderOptionsConfig, keyMap[optionId] || {}, optionsConfig)

            apiOptionsMap[optionId] = apiOptions[opsKey] = Object.assign({}, keyMap[optionId], apiOptionItem);
        } else {
            apiOptionsMap[optionId] = apiOptions[opsKey]
        }

        // 添加项 key
        optionsIds[opsKey] = optionId
    }

    function renderApiValue(apiKey: keyof P, value: any, valueKey?: string, labelKey?: string) {
        return renderApiValueByOptions(apiOptions, apiKey, value, valueKey, labelKey)
    }

    function renderApiOptions(apiKey: keyof P, options: ApiRenderOptionsOptionType) {
        return renderApiOptionsByOptions<P>(apiOptions, apiKey, options)
    }

    function renderApiTree(apiKey: keyof P, options: ApiRenderTreeOptionType) {
        return renderApiTreeByOptions(apiOptions, apiKey, options)
    }

    function reloadApiData(...apiKeys: (keyof P)[]) {
        const keys = apiKeys ? apiKeys.map(item => optionsIds[item] || item.toString()) : Object.values(optionsIds)
        reloadApiRenderCache(...keys).then(() => {
            for (let key of keys) {
                getApiData(apiOptions, key)
            }
        })
    }

    return {
        /**
         * api 项的 id 映射
         */
        ids: optionsIds,
        /**
         * 解析 api 数据，匹配值，返回 label
         * @param apiKey api 的 option 关键字
         * @param value 要匹配的 value 值
         * @param valueKey 要匹配的数据 value 关键字
         * @param labelKey 返回的 label 关键字
         */
        renderApiValue,
        /**
         * 解析 api 数据为选择项数据
         * @param apiKey api 的 option 关键字
         * @param options 配置项
         */
        renderApiOptions,
        /**
         * 解析 api 数据为树结构数据
         * @param apiKey api 的 option 关键字
         * @param options 配置项
         */
        renderApiTree,
        /**
         * 重新加载 api 项数据
         * @param apiKeys 要重载的 api 项 key
         */
        reloadApiData
    }
}

/**
 * 获取 api 数据并放到 api 响应式缓存中
 * @param apiOptions api 项
 * @param apiKey api 缓存 key
 */
async function getApiData<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T) {
    const api = apiOptions[apiKey];
    if (api) {
        if (api instanceof Function) {
            apiMapRef.value[apiKey] = await getApiRenderCache<any | any[]>(api, apiKey.toString())
        } else {
            apiMapRef.value[apiKey] = await getApiRenderCache<any | any[]>(api.api, apiKey.toString())
        }
    }
}

/**
 * 先判断有没有缓存再获取 api 数据并放到 api 响应式缓存中
 * @param apiOptions api 项
 * @param apiKey api 缓存 key
 */
export async function getApiDataIfNot<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T) {
    const apiValue = apiMapRef.value[apiKey];
    if (!apiValue) {
        await getApiData(apiOptions, apiKey)
    }
}

/**
 * 获取 api 的 label 关键字，如果存在 labelKey 则返回 labelKey
 * @param apiKey api 缓存 key
 * @param labelKey 覆盖的 label 关键字
 */
export function getLabelKey(apiKey: string | number | symbol, labelKey?: string): string {
    if (labelKey) return labelKey
    if (keyMap[apiKey]) return keyMap[apiKey].labelKey || apiRenderConfig.defaultLabelKey
    return apiRenderConfig.defaultLabelKey
}

/**
 * 获取 api 的 value 关键字，如果存在 valueKey 则返回 valueKey
 * @param apiKey api 缓存 key
 * @param valueKey 覆盖的 value 关键字
 */
export function getValueKey(apiKey: string | number | symbol, valueKey?: string): string {
    if (valueKey) return valueKey
    if (keyMap[apiKey]) return keyMap[apiKey].valueKey || apiRenderConfig.defaultValueKey
    return apiRenderConfig.defaultValueKey
}

export function getTreeValueKey(apiKey: string | number | symbol, treeValueKey?: string): string {
    if (treeValueKey) return treeValueKey
    if (keyMap[apiKey]) return keyMap[apiKey].treeValueKey || apiRenderConfig.defaultTreeValueKey
    return apiRenderConfig.defaultTreeValueKey
}

export function getTreeLabelKey(apiKey: string | number | symbol, treeLabelKey?: string): string {
    if (treeLabelKey) return treeLabelKey
    if (keyMap[apiKey]) return keyMap[apiKey].treeLabelKey || apiRenderConfig.defaultTreeLabelKey
    return apiRenderConfig.defaultTreeLabelKey
}

export function getTreeIdKey(apiKey: string | number | symbol, treeIdKey?: string): string {
    if (treeIdKey) return treeIdKey
    if (keyMap[apiKey]) return keyMap[apiKey].treeIdKey || apiRenderConfig.defaultTreeIdKey
    return apiRenderConfig.defaultTreeIdKey
}

export function getTreeParentKey(apiKey: string | number | symbol, treeParentKey?: string): string {
    if (treeParentKey) return treeParentKey
    if (keyMap[apiKey]) return keyMap[apiKey].treeParentIdKey || apiRenderConfig.defaultTreeParentIdKey
    return apiRenderConfig.defaultTreeParentIdKey
}

export function getTreeChildrenKey(apiKey: string | number | symbol, treeChildrenKey?: string): string {
    if (treeChildrenKey) return treeChildrenKey
    if (keyMap[apiKey]) return keyMap[apiKey].treeChildrenKey || apiRenderConfig.defaultTreeChildrenKey
    return apiRenderConfig.defaultTreeChildrenKey
}

export function getOptionsValueKey(apiKey: string | number | symbol, optionsValueKey?: string): string {
    if (optionsValueKey) return optionsValueKey
    if (keyMap[apiKey]) return keyMap[apiKey].optionsValueKey || apiRenderConfig.defaultOptionsValueKey
    return apiRenderConfig.defaultOptionsValueKey
}

export function getOptionsLabelKey(apiKey: string | number | symbol, optionsLabelKey?: string): string {
    if (optionsLabelKey) return optionsLabelKey
    if (keyMap[apiKey]) return keyMap[apiKey].optionsLabelKey || apiRenderConfig.defaultOptionsLabelKey
    return apiRenderConfig.defaultOptionsLabelKey
}
