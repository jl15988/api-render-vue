import { ApiRenderApiType } from "../ApiRenderCache";
export declare function useApiRenderValue<T extends {
    [key: string]: {
        valueKey?: string;
        labelKey?: string;
        api: ApiRenderApiType;
    } | ApiRenderApiType;
}>(loadApis: T): {
    renderApiValue: (apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) => any;
};
