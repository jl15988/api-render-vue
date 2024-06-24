import {VNode} from "vue";

type ApiRenderTemplateType = Record<string, (value: any, prop: Record<string, any>, data?: any) => string | VNode>

const apiRenderTemplate: ApiRenderTemplateType = {}

/**
 * 设置统一模板
 * @param templates 模板
 */
function setApiRenderTemplates<T extends ApiRenderTemplateType>(templates: T) {
    const apiRenderTemplateNamesMap: {
        [key in keyof T]: key
    } = {} as {
        [key in keyof T]: key
    }
    for (let templatesKey in templates) {
        apiRenderTemplateNamesMap[templatesKey] = templatesKey
        apiRenderTemplate[templatesKey] = templates[templatesKey]
    }

    return {
        apiRenderTemplateNamesMap
    }
}

export {
    apiRenderTemplate,
    setApiRenderTemplates
}
