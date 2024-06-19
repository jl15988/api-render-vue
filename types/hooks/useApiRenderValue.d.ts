import { ApiRenderOptionsType } from "../ApiRenderOptions";
export declare function useApiRenderValueByOptions<T extends ApiRenderOptionsType>(options: ApiRenderOptionsType, apiOptionKeys: (keyof T)[]): {
    renderApiValue: (apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) => any;
};
