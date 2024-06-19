export type ApiRenderApiType = (...params: any[]) => Promise<any>;
/**
 * 赋值缓存
 * @param api api 请求函数
 * @param value 缓存的值
 * @param key api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
 */
export declare function setApiRenderCache(api: ApiRenderApiType, value: any, key?: string | number): void;
/**
 * 获取 api 请求数据，优先取缓存数据，缓存不存在或缓存超时会重新请求获取
 * @param api api 请求函数
 * @param key api 的 key 值，可用来声明 api 缓存的 key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
 */
export declare function getApiRenderCache<T>(api?: ApiRenderApiType, key?: string | number): Promise<T | undefined>;
/**
 * 重新加载 api 缓存
 * @param apiKey 要加载的 api 换的 key，可以是具名函数，或者唯一ID，不能是匿名函数，不指定时则重新加载全部
 */
export declare function reloadApiRenderCache(apiKey?: ApiRenderApiType | string | number): Promise<void>;
