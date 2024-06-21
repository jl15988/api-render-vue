/**
 * 对象工具
 */
declare class ObjectUtil {
    /**
     * 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等
     * @param value 数据
     */
    isEmpty(value: any): boolean;
    /**
     * 深拷贝
     * @param obj 对象
     */
    deepCopy(obj: any): any;
    /**
     * 深合并，对于 source 中没有的属性不会覆盖
     * @param target 目标对象
     * @param sources 源对象
     */
    deepAssign<S extends Record<string, any>, T extends Record<string, any>>(target: S, ...sources: T[]): object;
    /**
     * 深合并，target 不可为空，target[targetKey] 可为空，默认赋值为 {}
     * @param target 目标对象
     * @param targetKey 目标对象 key
     * @param sources 源对象
     */
    deepAssignByKey<T extends object>(target: T, targetKey: keyof T, ...sources: object[]): object;
    /**
     * 当对象不为空时追加对应的值
     * @param obj 对象
     * @param appends 追加的值
     */
    appendIfNotEmpty(obj: any, appends: any): string;
    /**
     * 对象不是布尔是如果未空则返回默认值
     * @param obj 对象
     * @param defaultValue 默认值，默认为空字符串
     */
    defaultIfNotBoolean(obj: any, defaultValue?: any): any;
}
declare const _default: ObjectUtil;
export default _default;
