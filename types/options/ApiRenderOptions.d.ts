import { ApiRenderApiType } from "../ApiRenderCache";
import { ApiRenderTreeOptionType } from "./renderApiRenderTree";
import { ApiRenderOptionsOptionType } from "./renderApiRenderOptions";
export type ApiRenderOptionsKeyConfigType = {
    labelKey: string;
    valueKey: string;
    treeValueKey: string;
    treeLabelKey: string;
    treeIdKey: string;
    treeChildrenKey: string;
    treeParentIdKey: string;
    optionsValueKey: string;
    optionsLabelKey: string;
};
export type ApiRenderOptionsConfigType = Partial<ApiRenderOptionsKeyConfigType> & {
    api: ApiRenderApiType;
};
export type ApiRenderOptionsType = Record<string, ApiRenderOptionsConfigType | ApiRenderApiType>;
export declare const apiOptionsMap: ApiRenderOptionsType;
export declare const apiMapRef: import("vue").Ref<{
    [key: string]: any;
    [key: number]: any;
    [key: symbol]: any;
}>;
/**
 * 获取 api 响应式数据缓存值
 * @param apiKey api 数据缓存 key
 */
export declare function getApiMapRefValue(apiKey: string | number | symbol): any | any[];
/**
 * 获取默认的项配置
 */
export declare function getDefaultApiRenderOptionsConfig(): ApiRenderOptionsKeyConfigType;
export declare function defineApiRender<D extends string, P extends ApiRenderOptionsType>(id: D | P, options?: P): {
    /**
     * api 项的关键字映射
     */
    keysMap: { [key in keyof P]: string; };
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
     * @param apiKey 要重载的 api 项 key
     */
    reloadApiRenderOptionsData: (...apiKeys: (keyof P)[]) => void;
};
/**
 * 先判断有没有缓存再获取 api 数据并放到 api 响应式缓存中
 * @param apiOptions api 项
 * @param apiKey api 缓存 key
 */
export declare function getApiDataIfNot<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T): Promise<void>;
/**
 * 获取 api 的 label 关键字，如果存在 labelKey 则返回 labelKey
 * @param apiKey api 缓存 key
 * @param labelKey 覆盖的 label 关键字
 */
export declare function getLabelKey(apiKey: string | number | symbol, labelKey?: string): string;
/**
 * 获取 api 的 value 关键字，如果存在 valueKey 则返回 valueKey
 * @param apiKey api 缓存 key
 * @param valueKey 覆盖的 value 关键字
 */
export declare function getValueKey(apiKey: string | number | symbol, valueKey?: string): string;
export declare function getTreeValueKey(apiKey: string | number | symbol, treeValueKey?: string): string;
export declare function getTreeLabelKey(apiKey: string | number | symbol, treeLabelKey?: string): string;
export declare function getTreeIdKey(apiKey: string | number | symbol, treeIdKey?: string): string;
export declare function getTreeParentKey(apiKey: string | number | symbol, treeParentKey?: string): string;
export declare function getTreeChildrenKey(apiKey: string | number | symbol, treeChildrenKey?: string): string;
export declare function getOptionsValueKey(apiKey: string | number | symbol, optionsValueKey?: string): string;
export declare function getOptionsLabelKey(apiKey: string | number | symbol, optionsLabelKey?: string): string;
