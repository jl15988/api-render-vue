import { defineApiRender } from "./options/ApiRenderOptions";
import { getApiRenderCache, reloadApiRenderCache, setApiRenderCache } from './ApiRenderCache';
import ApiRenderTool from "./ApiRenderTool";
import { getApiRenderConfig, setApiRenderConfig } from "./ApiRenderConfig";
declare const ApiRenderUtils: {
    ArrayUtil: {
        repeat(arr: (string | number)[], count: number): string;
        finalItem(arr: any[], defaultItem?: any): any;
        push(arr: any[] | null, item: any): any[];
        isEmpty(array: any[]): boolean;
        isNotEmpty(array: any[]): boolean;
        defaultIfEmpty(array: any[], defaultArray: any[]): any[];
        fixedUnshift(array: any[], len: number, ...items: any[]): any[];
        fixedPush(array: any[], len: number, ...items: any[]): any[];
        deepCopy(array: any[]): any[];
        deepAssign(targets: (object | object[])[], sources: (object | object[])[]): any[];
        unique(arr: any[], uniMapper?: ((cur: any) => any) | undefined): any[];
        intersection(...arrs: any[]): any[];
        union(...arrs: any[]): any[];
        difference(...arrs: any): any[];
        groupBy(arr: any[], keyMapper: (cur: any) => any): any;
    };
    ObjectUtil: {
        isEmpty(value: any): boolean;
        deepCopy(obj: any): any;
        deepAssign<S extends Record<string, any>, T extends Record<string, any>>(target: S, ...sources: T[]): object;
        deepAssignByKey<T_1 extends object>(target: T_1, targetKey: keyof T_1, ...sources: object[]): object;
        appendIfNotEmpty(obj: any, appends: any): string;
        defaultIfNotBoolean(obj: any, defaultValue?: any): any;
    };
    TreeUtil: {
        LEVEL_NAME: string;
        LEVEL_BEGIN: number;
        BUILT_TAG: string;
        buildTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string | undefined, mapper?: import("./utils/TreeUtil").TreeNodeMapper | undefined, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper | undefined): any[];
        buildCommonTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string | undefined, mapper?: import("./utils/TreeUtil").TreeNodeMapper | undefined, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper | undefined): any[];
        filterRoot(list: any[], levelName?: string | undefined): any[];
        buildTreeMapper(list: any[], idName: string, parentName: string, mapper: import("./utils/TreeUtil").TreeNodeMapper, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper | undefined): void;
        toTreeMapper(list: any[], obj: any, idName: string, parentName: string, mapper: import("./utils/TreeUtil").TreeNodeMapper, leafMapper?: import("./utils/TreeUtil").TreeLeafNodeMapper | undefined, parentLevel?: number | undefined): void;
    };
};
declare const ApiRender: import("vue").DefineComponent<{
    /**
     * api 键
     */
    apiKey: {
        type: StringConstructor[];
        required: true;
    };
    /**
     * 匹配值
     */
    value: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * api 键
     */
    apiKey: {
        type: StringConstructor[];
        required: true;
    };
    /**
     * 匹配值
     */
    value: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor)[];
    };
}>>, {}, {}>;
export { defineApiRender, setApiRenderCache, getApiRenderCache, reloadApiRenderCache, ApiRenderTool, setApiRenderConfig, getApiRenderConfig, ApiRenderUtils };
export default ApiRender;
