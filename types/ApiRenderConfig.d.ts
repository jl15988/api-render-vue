export type ApiRenderConfigType = {
    /**
     * 是否打开缓存，默认 true
     */
    openCache: boolean;
    /**
     * api 数据缓存有效期，默认 5 分钟，单位毫秒
     * <p>被缓存的数据的有效时长，过了该时长数据将会过期然后重新发起请求并重新缓存</p>
     */
    cacheTimeout: number;
    /**
     * 是否开启缓存清理，默认 true
     * <p>如果不开启，则超时缓存不会被清除，无论缓存有没有超时，获取的数据永远都是缓存的数据</p>
     */
    openClearCache: boolean;
    /**
     * 清理缓存间隔时长，默认 1 分钟，单位毫秒
     * <p>在该间隔内，将不会执行异步缓存清理，也就是说，当你获取某个 api 缓存时，该 api 仍会检查缓存有效期，但对于其他缓存将不在乎</p>
     */
    clearCacheSpace: number;
    /**
     * 默认的 label 关键字，默认 label
     */
    defaultLabelKey: string;
    /**
     * 默认的 value 关键字，默认 value
     */
    defaultValueKey: string;
    /**
     * 默认的树结构 label 关键字，默认 label
     */
    defaultTreeLabelKey: string;
    /**
     * 默认的树结构 value 关键字，默认 value
     */
    defaultTreeValueKey: string;
    /**
     * 默认的树结构主键关键字，默认 id
     */
    defaultTreeIdKey: string;
    /**
     * 默认的树结构子节点关键字，默认 children
     */
    defaultTreeChildrenKey: string;
    /**
     * 默认的树结构父级主键关键字，默认 parentId
     */
    defaultTreeParentIdKey: string;
    /**
     * 默认的选择项中值关键字，默认 value
     */
    defaultOptionsValueKey: string;
    /**
     * 默认的选择项中名称关键字，默认 label
     */
    defaultOptionsLabelKey: string;
};
declare const apiRenderConfig: ApiRenderConfigType;
export declare function setApiRenderConfig(config: Partial<ApiRenderConfigType>): void;
export declare function getApiRenderConfig(): ApiRenderConfigType;
export default apiRenderConfig;
