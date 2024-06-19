const apiRenderConfig = {
    // api 数据缓存有效期
    cacheTimeout: 1000 * 60 * 5,
    // 清理缓存间隔时长
    clearCacheSpace: 1000 * 60
}

/**
 * 设置 api 数据缓存有效期，单位毫秒，默认 5 分钟
 * <p>被缓存的数据的有效时长，过了该时长数据将会过期然后重新发起请求并重新缓存</p>
 */
export function setCacheTimeout(timeout: number) {
    apiRenderConfig.cacheTimeout = timeout
}

/**
 * 获取缓存 api 数据有效期
 */
export function getCacheTimeout() {
    return apiRenderConfig.cacheTimeout
}

/**
 * 设置清理缓存间隔时长，单位毫秒，默认 1 分钟
 * <p>在该间隔内，将不会执行异步缓存清理，也就是说，当你获取某个 api 缓存时，该 api 仍会检查缓存有效期，但对于其他缓存将不在乎</p>
 */
export function setClearCacheSpace(space: number) {
    apiRenderConfig.clearCacheSpace = space
}

/**
 * 获取清理缓存间隔时长
 */
export function getClearCacheSpace() {
    return apiRenderConfig.clearCacheSpace
}

export default apiRenderConfig
