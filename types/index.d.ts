import { setApiRenderOptions } from "./options/ApiRenderOptions";
import { getApiRenderCache, reloadApiRenderCache, setApiRenderCache } from './ApiRenderCache';
import ApiRenderTool from "./ApiRenderTool";
import ApiRender from "./values";
import { getApiRenderConfig, setApiRenderConfig } from "./ApiRenderConfig";
declare const ApiRenderUtils: {
    ArrayUtil: {
        repeat(arr: (string | number)[], count: number): string;
        finalItem(arr: any[], defaultItem?: any): any;
        push(arr: any[], item: any): any[];
        isEmpty(array: any[]): boolean;
        isNotEmpty(array: any[]): boolean;
        defaultIfEmpty(array: any[], defaultArray: any[]): any[];
        fixedUnshift(array: any[], len: number, ...items: any[]): any[];
        fixedPush(array: any[], len: number, ...items: any[]): any[];
        deepCopy(array: any[]): any[];
        deepAssign(targets: (object | object[])[], sources: (object | object[])[]): any[];
        unique(arr: any[], uniMapper?: (cur: any) => any): any[];
        intersection(...arrs: any[]): any[];
        union(...arrs: any[]): any[];
        difference(...arrs: any): any[];
        groupBy(arr: any[], keyMapper: (cur: any) => any): any;
    };
    ObjectUtil: {
        isEmpty(value: any): boolean;
        deepCopy(obj: any): any;
        deepAssign(target: object, ...sources: object[]): object;
        deepAssignByKey<T extends object>(target: T, targetKey: keyof T, ...sources: object[]): object;
        appendIfNotEmpty(obj: any, appends: any): string;
        defaultIfNotBoolean(obj: any, defaultValue?: any): any;
    };
    TreeUtil: {
        LEVEL_NAME: string;
        LEVEL_BEGIN: number;
        BUILT_TAG: string;
        buildTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string, mapper?: import("./utils/TreeUtil").TreeNodeMapper, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper): any[];
        buildCommonTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string, mapper?: import("./utils/TreeUtil").TreeNodeMapper, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper): any[];
        filterRoot(list: any[], levelName?: string): any[];
        buildTreeMapper(list: any[], idName: string, parentName: string, mapper: import("./utils/TreeUtil").TreeNodeMapper, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper): void;
        toTreeMapper(list: any[], obj: any, idName: string, parentName: string, mapper: import("./utils/TreeUtil").TreeNodeMapper, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper, parentLevel?: number): void;
    };
};
export { setApiRenderOptions, setApiRenderCache, getApiRenderCache, reloadApiRenderCache, ApiRenderTool, setApiRenderConfig, getApiRenderConfig, ApiRenderUtils };
declare const apiRenderVue: typeof ApiRender;
export default apiRenderVue;
