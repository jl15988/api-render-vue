/*
api 渲染请求缓存

如果提供有名函数，则直接将函数作为 key 来缓存数据，这样 key 的引用会指向函数

如果提供匿名函数，则通过 Map 实现，又分两种情况，提供 apiKey 或者不提供
1. 有 apiKey 时，则把 apiKey 作为 key 来缓存数据
2. 没有时，则将 api 通过 toString 函数字符串化作为缓存 key，所以这种方式是不太安全的，因为匿名函数可能会重复（但大多数情况不会）

---自动回收实现
缓存数据数据时赋值缓存时间，当获取数据时相同 key 的数据会先判断超时，如果超时则重新获取，否则直接返回
而其他数据则通过异步遍历判断超时，超时则删除，且通过记录上次清理缓存时间来防止一段时间内多次清理
 */
// api 渲染请求函数类型
import apiRenderConfig from "./ApiRenderConfig";

export type ApiRenderApiType = (params?: any) => Promise<any>
// api 渲染缓存值
type ApiRenderValueType = {
  value: any
  api: ApiRenderApiType
  timestamp: number
}

// 缓存
// const apiRenderCache = new WeakMap<ApiRenderApiType, ApiRenderValueType>()
const apiRenderMap = new Map<string | number | ApiRenderApiType, ApiRenderValueType>()
// 请求缓存
const requestCache = new Map<string | number | ApiRenderApiType, Promise<any>>()

// 上次清理缓存时间戳
let clearCacheTime = 0

// 遍历清理缓存
function clearTimeoutCache(): Promise<boolean> {
  if (clearCacheTime + apiRenderConfig.clearCacheSpace > Date.now()) return Promise.resolve(true)
  clearCacheTime = Date.now()
  return new Promise((resolve) => {
    for (const [key, value] of apiRenderMap.entries()) {
      if (value.timestamp + apiRenderConfig.cacheTimeout <= Date.now()) {
        // 如果超时，则移除该键值对
        apiRenderMap.delete(key)
      }
    }
    resolve(true)
  })
}

// 请求，通过请求缓存防止同一时间内发生多次请求
async function apiRenderRequest(api: ApiRenderApiType, key?: string | number) {
  const requestKey = getApiCacheKey(api, key)
  let requestCacheItem = requestCache.get(requestKey)
  if (!requestCacheItem) {
    requestCache.set(requestKey, api())
    requestCacheItem = requestCache.get(requestKey)
  }
  const res = await requestCacheItem
  requestCache.delete(requestKey)
  return res
}

// 获取 api 缓存 key
function getApiCacheKey(
  api: ApiRenderApiType,
  key?: string | number
): string | number | ApiRenderApiType {
  if (key) {
    // 如果指定 key 则直接使用 key
    return key
  } else if (!api.name) {
    // 匿名函数使用函数签名
    return api.toString()
  } else {
    // 具名函数使用引用
    return api
  }
}

// 通过缓存中的缓存 key 获取 apiKey，用于缓存的重新加载
function getApiKeyByCacheKey(cacheKey: ApiRenderApiType | number | string) {
  if (typeof cacheKey === 'string' || typeof cacheKey === 'number') {
    return cacheKey
  }
  return undefined
}

/**
 * 赋值缓存
 * @param api api 请求函数
 * @param value 缓存的值
 * @param key api 的 key 值，可用来声明 api 缓存的key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
 */
export function setApiRenderCache(api: ApiRenderApiType, value: any, key?: string | number) {
  const cacheValue = {
    value: value,
    api: api,
    timestamp: Date.now()
  }
  apiRenderMap.set(getApiCacheKey(api, key), cacheValue)
}

/**
 * 获取 api 请求数据，优先取缓存数据，缓存不存在或缓存超时会重新请求获取
 * @param api api 请求函数
 * @param key api 的 key 值，可用来声明 api 缓存的 key，api 请求的数据会自动缓存，所以 api 函数尽量使用有名函数，或者如果使用匿名函数，在不保证匿名函数会字符会重复的前提下，请提供该字段
 */
export async function getApiRenderCache<T>(
  api?: ApiRenderApiType,
  key?: string | number
): Promise<T | undefined> {
  // 没有 api 则返回没有
  if (!api) return Promise.resolve(undefined)
  // 获取缓存的数据
  const cache = apiRenderMap.get(getApiCacheKey(api, key))
  if (!apiRenderConfig.cacheTimeout || apiRenderConfig.cacheTimeout <= 0) {
    // 没有超时时间都走请求
    return (await apiRenderRequest(api, key)) as T
  }
  if (!cache || (cache && cache.timestamp && cache.timestamp + apiRenderConfig.cacheTimeout <= Date.now())) {
    // 没有缓存数据重新请求
    const res = await apiRenderRequest(api, key)
    // 缓存
    setApiRenderCache(api, res, key)
    // 清理
    clearTimeoutCache()
    return res as T
  }
  // 清理
  clearTimeoutCache()
  return Promise.resolve(cache.value as T)
}

// 通过缓存 key 和缓存内容重新加载缓存
async function reloadApiRenderCacheByKeyAndValue(
  key: string | number | ApiRenderApiType,
  cacheItem: ApiRenderValueType
) {
  const apiK = getApiKeyByCacheKey(key)
  const res = await apiRenderRequest(cacheItem.api, apiK)
  // 缓存
  setApiRenderCache(cacheItem.api, res, apiK)
}

/**
 * 重新加载 api 缓存
 * @param apiKey 要加载的 api 换的 key，可以是具名函数，或者唯一ID，不能是匿名函数，不指定时则重新加载全部
 */
export async function reloadApiRenderCache(
  apiKey?: ApiRenderApiType | string | number
): Promise<void> {
  if (!apiKey) {
    // 如果没有指定 api 则重新加载全部
    for (const [key, value] of apiRenderMap.entries()) {
      if (!value || !value.api) {
        apiRenderMap.delete(key)
        continue
      }
      await reloadApiRenderCacheByKeyAndValue(key, value)
    }
    return Promise.resolve()
  }
  // 重新加载单个缓存
  const cache = apiRenderMap.get(apiKey)
  if (!cache || !cache.api) {
    return Promise.resolve()
  }
  await reloadApiRenderCacheByKeyAndValue(apiKey, cache)
  // 清理
  clearTimeoutCache()
}
