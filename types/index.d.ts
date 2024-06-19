import { getApiRenderCache, reloadApiRenderCache, setApiRenderCache } from './ApiRenderCache';
import ApiRenderUtil from "./ApiRenderUtil";
import { useApiRenderValue } from "./hooks/useApiRenderValue";
import { useApiRenderOptions } from "./hooks/useApiRenderOptions";
import { useApiRenderTree } from "./hooks/useApiRenderTree";
export { setApiRenderCache, getApiRenderCache, reloadApiRenderCache, ApiRenderUtil, useApiRenderValue, useApiRenderOptions, useApiRenderTree };
/**
 * 设置 api 数据缓存有效期，单位毫秒，默认 5 分钟
 * <p>被缓存的数据的有效时长，过了该时长数据将会过期然后重新发起请求并重新缓存</p>
 */
export declare function setCacheTimeout(timeout: number): void;
/**
 * 获取缓存 api 数据有效期
 */
export declare function getCacheTimeout(): number;
/**
 * 设置清理缓存间隔时长，单位毫秒，默认 1 分钟
 * <p>在该间隔内，将不会执行异步缓存清理，也就是说，当你获取某个 api 缓存时，该 api 仍会检查缓存有效期，但对于其他缓存将不在乎</p>
 */
export declare function setClearCacheSpace(space: number): void;
/**
 * 获取清理缓存间隔时长
 */
export declare function getClearCacheSpace(): number;
