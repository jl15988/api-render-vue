import ArrayUtil from "./ArrayUtil";

/**
 * 对象工具
 */
class ObjectUtil {

    /**
     * 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等
     * @param value 数据
     */
    isEmpty(value: any): boolean {
        // 如果值未定义或者为null，返回true
        if (value == null) {
            return true;
        }

        // 如果值是字符串，并且长度为0，返回true
        if (typeof value === 'string' && value.trim() === '') {
            return true;
        }

        // 如果值是数组，并且长度为0，返回true
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }

        // 如果值是对象，并且没有可枚举的属性，返回true
        if (typeof value === 'object' && Object.keys(value).length === 0) {
            return true;
        }

        // 其他情况，返回false
        return false;
    }

    /**
     * 深拷贝
     * @param obj 对象
     */
    deepCopy(obj: any): any {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        const copy = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                copy[key] = Array.isArray(value) ? ArrayUtil.deepCopy(obj[key]) : this.deepCopy(value);
            }
        }
        return copy;
    }

    /**
     * 深合并，对于 source 中没有的属性不会覆盖
     * @param target 目标对象
     * @param sources 源对象
     */
    deepAssign(target: object, ...sources: object[]): object {
        if (!sources) {
            return target;
        }
        for (let source of sources) {
            if (typeof source !== "object") {
                continue
            }
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    const value = source[key];
                    if (value === undefined || value === null) continue
                    if (Array.isArray(value)) {
                        if (!!value && !Array.isArray(value)) {
                            target[key] = ArrayUtil.deepAssign([], source[key])
                        } else {
                            target[key] = ArrayUtil.deepAssign(target[key] || [], source[key])
                        }
                    } else {
                        if (typeof value !== 'object') {
                            target[key] = value
                        } else {
                            if (!!target[key] && Array.isArray(target[key])) {
                                target[key] = this.deepAssign({}, value)
                            } else {
                                target[key] = this.deepAssign(target[key] || {}, value)
                            }
                        }
                    }
                }
            }
        }
        return target;
    }

    /**
     * 深合并，target 不可为空，target[targetKey] 可为空，默认赋值为 {}
     * @param target 目标对象
     * @param targetKey 目标对象 key
     * @param sources 源对象
     */
    deepAssignByKey<T extends object>(target: T, targetKey: keyof T, ...sources: object[]): object {
        if (!sources) {
            return target;
        }
        if (!target[targetKey]) {
            // @ts-ignore
            target[targetKey] = {}
        }
        // @ts-ignore
        return this.deepAssign(target[targetKey], ...sources);
    }

    /**
     * 当对象不为空时追加对应的值
     * @param obj 对象
     * @param appends 追加的值
     */
    appendIfNotEmpty(obj: any, appends: any): string {
        if (!this.isEmpty(obj)) {
            return obj.toString().concat(appends);
        }
        return '';
    }
}

export default new ObjectUtil();
