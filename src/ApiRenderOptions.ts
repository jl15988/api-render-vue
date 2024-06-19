import {ApiRenderApiType} from "./ApiRenderCache";
import {useApiRenderValueByOptions} from "./hooks/useApiRenderValue";

export type ApiRenderOptionsConfig = {
    labelKey?: string;
    valueKey?: string;
    api: ApiRenderApiType
}

export type ApiRenderOptionsType = {
    [key: string]: ApiRenderOptionsConfig | ApiRenderApiType
}

export function setApiRenderOptions<T extends ApiRenderOptionsType>(ops: T) {
    const options: ApiRenderOptionsType = ops

    function useApiRenderValue(...apiOptions: (keyof T)[]) {
        return useApiRenderValueByOptions<T>(options, apiOptions)
    }

    return {
        useApiRenderValue
    }
}
