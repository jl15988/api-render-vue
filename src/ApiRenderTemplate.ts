import {VNode} from "vue";
import {ApiRenderProps} from "./ApiRenderVue";

export type ApiRenderTemplateParamsType = {
    /**
     * 当前值
     */
    value: any,
    /**
     * 组件属性
     */
    prop: ApiRenderProps,
    /**
     * 获取的 api 数据
     */
    data?: any | any[],
    /**
     * 组件绑定值
     */
    modelValue?: any,
    /**
     * 更新组件绑定值的回调
     * @param value 要更新的值
     */
    modelBack: (value: any) => any
}

type ApiRenderTemplateType = Record<string, (params: ApiRenderTemplateParamsType) => string | VNode | string[] | VNode[]> | any

export const apiRenderTemplate: ApiRenderTemplateType = {}

type DefineApiRenderTemplateType<T> = {
    /**
     * 统一模板关键字映射
     */
    keys: { [key in keyof T]: string; };
}

/**
 * 定义统一模板
 * @param id 分包 ID
 * @param templates 模板项
 */
export function defineApiTemplates<D extends string, T extends ApiRenderTemplateType>(id: D, templates: T): DefineApiRenderTemplateType<T>
/**
 * 定义统一模板
 * @param templates 模板项
 */
export function defineApiTemplates<T extends ApiRenderTemplateType>(templates: T): DefineApiRenderTemplateType<T>

export function defineApiTemplates<D extends string, T extends ApiRenderTemplateType>(id: D | T, templates: T = {} as T) {
    const templateId = typeof id === 'string' ? id : ''
    const templateOptions = typeof id === 'object' ? id : templates
    const keys: {
        [key in keyof T]: string
    } = {} as {
        [key in keyof T]: string
    }
    for (let templatesKey in templateOptions) {
        const optionId = templateId ? templateId + '#' + templatesKey : templatesKey
        keys[templatesKey] = optionId
        apiRenderTemplate[optionId] = templateOptions[templatesKey]
    }

    return {
        keys
    }
}

/**
 * 根据模板名称获取模板函数
 * @param name 模板名称
 */
export function getTemplate(name?: string) {
    let renderFun = (params: ApiRenderTemplateParamsType) => {
        return params.value
    }
    if (name) {
        const templateFun = apiRenderTemplate[name]
        if (templateFun) {
            renderFun = templateFun
        }
    }
    return renderFun
}
