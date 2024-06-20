import { ApiRenderOptionsType } from "../ApiRenderOptions";
export declare function useApiRenderValueByOptions<T extends ApiRenderOptionsType>(options: T): {
    renderApiValue: (apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) => any;
};
