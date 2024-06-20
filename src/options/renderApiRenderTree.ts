import {
    ApiRenderOptionsType,
    getApiDataIfNot,
    getApiMapRefValue,
    getLabelKey,
    getTreeChildrenKey,
    getTreeIdKey,
    getTreeLabelKey,
    getTreeParentKey,
    getValueKey
} from "./ApiRenderOptions";
import TreeUtil from "../utils/TreeUtil";

export type ApiRenderTreeOptionType = {
    /**
     * 数据父级主键属性名，默认 parentId
     */
    parentKey?: string
    /**
     * 数据中要显示的名称的属性名，默认 label
     */
    labelKey?: string
    /**
     * 数据中 value 属性名，默认 value
     */
    valueKey?: string
    /**
     * 数据中主键属性名，默认 id
     */
    idKey?: string
    /**
     * 生成树数据中的要显示的名称的属性名，默认 label
     */
    treeLabelKey?: string
    /**
     * 生成树数据中的 value 属性名，默认 value
     */
    treeValueKey?: string
    /**
     * 子数据属性名，默认 children
     */
    treeChildrenKey?: string
}

export function renderApiTreeByOptions<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, options: ApiRenderTreeOptionType): any[] {
    getApiDataIfNot(apiOptions, apiKey)
    const res = getApiMapRefValue(apiKey)
    if (!res || !Array.isArray(res)) return []
    let {labelKey, valueKey, treeLabelKey, treeValueKey, treeChildrenKey, parentKey, idKey} = options;
    labelKey = getLabelKey(apiKey, labelKey)
    valueKey = getValueKey(apiKey, valueKey)
    treeLabelKey = getTreeLabelKey(apiKey, treeLabelKey)
    treeValueKey = getValueKey(apiKey, treeValueKey)
    treeChildrenKey = getTreeChildrenKey(apiKey, treeChildrenKey)
    parentKey = getTreeParentKey(apiKey, parentKey)
    idKey = getTreeIdKey(apiKey, idKey)
    const list = res.map(item => {
        return {
            [treeLabelKey]: item[labelKey],
            [treeValueKey]: item[valueKey],
        }
    })
    return TreeUtil.buildCommonTree(list, idKey, parentKey, treeChildrenKey)
}
