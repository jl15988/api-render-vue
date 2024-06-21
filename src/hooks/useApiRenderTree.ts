import {ref} from "vue";
import {ApiRenderApiType, getApiRenderCache} from "../ApiRenderCache";
import TreeUtil from "../utils/TreeUtil";

/**
 * 生成 tree 组件所需数据
 * @param api api 请求函数
 * @param options 参数配置
 * @param options.apiKey api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
 * @param options.parentKey 数据父级主键属性名，默认 parentId
 * @param options.labelKey 数据中要显示的名称的属性名，默认 label
 * @param options.valueKey 数据中 value 属性名，默认 value
 * @param options.treeLabelKey 生成树数据中的要显示的名称的属性名，默认 label
 * @param options.treeValueKey 生成树数据中的 value 属性名，默认 value
 * @param options.treeChildrenKey 生成树数据中的子数据属性名，默认 children
 */
export function useApiRenderTree(api: ApiRenderApiType, options: {
    // api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
    apiKey?: string | number,
    // 数据父级主键属性名，默认 parentId
    parentKey?: string,
    // 数据中要显示的名称的属性名，默认 label
    labelKey?: string,
    // 数据中 value 属性名，默认 value
    valueKey?: string,
    // 生成树数据中的要显示的名称的属性名，默认 label
    treeLabelKey?: string,
    // 生成树数据中的 value 属性名，默认 value
    treeValueKey?: string,
    // 生成树数据中的子数据属性名，默认 children
    treeChildrenKey?: string
}) {
    let {apiKey, parentKey, labelKey, valueKey, treeLabelKey, treeValueKey, treeChildrenKey} = options || {}

    treeLabelKey = treeLabelKey || 'label'
    treeValueKey = treeValueKey || 'value'
    labelKey = labelKey || 'label'
    valueKey = valueKey || 'value'

    const apiRenderTreeData = ref<any>([])

    getApiRenderCache<any[]>(api, apiKey).then(res => {
        if (!res) return
        let list = res

        if (treeLabelKey !== labelKey || treeValueKey !== valueKey) {
            list = res.map(item => {
                const obj: Record<string, any> = {}
                if (treeLabelKey !== labelKey) {
                    obj[treeLabelKey] = item[labelKey]
                }
                if (treeValueKey !== valueKey) {
                    obj[treeValueKey] = item[valueKey]
                }
                return obj
            })
        }
        apiRenderTreeData.value = TreeUtil.buildCommonTree(list, treeValueKey || 'value', parentKey || 'parentId', treeChildrenKey || 'children')
    })

    return {
        apiRenderTreeData
    }
}
