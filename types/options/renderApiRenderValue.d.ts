import { ApiRenderOptionsType } from "./ApiRenderOptions";
export declare function renderApiValueByOptions<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, value: any, valueKey?: string, labelKey?: string): Promise<any>;
export declare function renderApiValueByOptionsAsync<T extends ApiRenderOptionsType>(apiOptions: T, apiKey: keyof T, value: any, valueKey?: string, labelKey?: string): any;
