import { ApiRenderOptionsType } from "./ApiRenderOptions";
export type ApiRenderOptionsOptionType = {
    /**
     * 数据中值的属性名
     */
    valueKey?: string;
    /**
     * 数据中名称的属性名
     */
    labelKey?: string;
    /**
     * 生成的数据中值的属性名
     */
    dataValueKey?: string;
    /**
     * 生成的数据中名称的属性名
     */
    dataLabelKey?: string;
};
export declare function renderApiOptionsByOptions<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, options: ApiRenderOptionsOptionType): any;
