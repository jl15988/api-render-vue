import { ApiRenderApiType } from "./ApiRenderCache";
export type ApiRenderOptionsConfig = {
    labelKey?: string;
    valueKey?: string;
    api: ApiRenderApiType;
};
export type ApiRenderOptionsType = {
    [key: string]: ApiRenderOptionsConfig | ApiRenderApiType;
};
export declare function setApiRenderOptions<T extends ApiRenderOptionsType>(ops: T): {
    useApiRenderValue: (...apiOptions: (keyof T)[]) => {
        renderApiValue: (apiKey: keyof T, value: any, valueKey?: string, labelKey?: string) => any;
    };
};
