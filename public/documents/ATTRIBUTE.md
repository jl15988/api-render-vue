# 属性

## 1. api-render-vue 依赖属性

| 属性                       | 参数                                                         | 描述                                |
|--------------------------|------------------------------------------------------------|-----------------------------------|
| default                  | 无                                                          | apiRender 组件                      |
| defineApiRender          | id：定义的 id 值（可选），当定义多个 api 项时，用以区分，否则将会覆盖，options：定义的 api 项 | 定义 api 项，使用组件时，可传入 apiKey 来自动获取数据 |
| reloadApiRenderCache     | apiKeys：要加载的 api 缓存的 key                                   | 重新加载 api 缓存                       |
| setApiRenderConfig       | config：配置项                                                 | 设置全局配置项                           |
| getApiRenderConfig       | 无                                                          | 获取配置                              |
| defineApiRenderTemplates | templates：模板                                               | 定义统一模板，传入组件对应的 name 可渲染模板函数返回的内容  |


## 2. defineApiRender 结果属性


| 属性               | 参数                                                                                                    | 描述                     |
|------------------|-------------------------------------------------------------------------------------------------------|------------------------|
| ids              | 无                                                                                                     | api 项的 id 映射           |
| renderApiValue   | apiKey： api 的 option 关键字，param： value 要匹配的 value 值，valueKey： 要匹配的数据 value 关键字，labelKey： 返回的 label 关键字 | 解析 api 数据，匹配值，返回 label |
| renderApiOptions | apiKey： api 的 option 关键字，options： 配置项                                                                 | 解析 api 数据为选择项数据        |
| renderApiTree    | apiKey： api 的 option 关键字，options： 配置项                                                                 | 解析 api 数据为树结构数据        |
| reloadApiData    | apiKeys 要重载的 api 项 key                                                                                | 重新加载 api 项数据           |


## 3. defineApiTemplates 结果属性

| 属性  | 参数 | 描述        |
|-----|----|-----------|
| ids | 无  | 模版项 id 映射 |
