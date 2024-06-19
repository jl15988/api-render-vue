import { ApiRenderApiType } from "../ApiRenderCache";
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
export declare function useApiRenderTree(api: ApiRenderApiType, options: {
    apiKey?: string | number;
    parentKey?: string;
    labelKey?: string;
    valueKey?: string;
    treeLabelKey?: string;
    treeValueKey?: string;
    treeChildrenKey?: string;
}): {
    apiRenderTreeData: import("vue").Ref<any[]>;
};
