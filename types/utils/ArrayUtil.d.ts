/**
 * 数组工具
 */
declare class ArrayUtil {
    /**
     * 将数组循环拼接
     * @param arr 数组
     * @param count 循环次数
     */
    repeat(arr: (string | number)[], count: number): string;
    /**
     * 获取数组的最后一个元素
     * @param arr 数组
     * @param defaultItem 如果为空时，返回的默认值，非必传
     */
    finalItem(arr: any[], defaultItem?: any): any;
    /**
     * 向数组中添加新的元素并返回，如果数组为空，则返回包含新元素的数组
     * @param arr 数组
     * @param item 新元素
     */
    push(arr: any[] | null, item: any): any[];
    /**
     * 判断数组是否为空数组
     * @param array 数组
     */
    isEmpty(array: any[]): boolean;
    /**
     * 判断数组为非空数组
     * @param array 数组
     */
    isNotEmpty(array: any[]): boolean;
    /**
     * 如果数组为空则替换，否则直接返回
     * @param array 判空的数组
     * @param defaultArray 替换的数组
     */
    defaultIfEmpty(array: any[], defaultArray: any[]): any[];
    /**
     * 固定长度首部添加元素，返回删除的元素（向数组开头添加元素，如果长度超出指定长度，则删除尾部元素）
     * @param array 数组
     * @param len 固定的长度
     * @param items 要添加的元素
     */
    fixedUnshift(array: any[], len: number, ...items: any[]): any[];
    /**
     * 固定长度尾部添加元素，返回删除的元素（向数组最后添加元素，如果长度超出指定长度，则删除首部元素）
     * @param array 数组
     * @param len 固定的长度
     * @param items 要添加的元素
     */
    fixedPush(array: any[], len: number, ...items: any[]): any[];
    /**
     * 深拷贝
     * @param array 数组
     */
    deepCopy(array: any[]): any[];
    /**
     * 深合并
     * @param targets 目标数组
     * @param sources 源数组
     */
    deepAssign(targets: (object | object[])[], sources: (object | object[])[]): any[];
    /**
     * 去重
     * @param arr 要去重的数组
     * @param uniMapper 去重处理器，默认按当前元素去重
     */
    unique(arr: any[], uniMapper?: (cur: any) => any): any[];
    /**
     * 取交集
     * @param arrs 要取交集的数组集
     */
    intersection(...arrs: any[]): any[];
    /**
     * 取并集
     * @param arrs 要取并集的数组集
     */
    union(...arrs: any[]): any[];
    /**
     * 取差集
     * @param arrs 要取差集的数组集
     */
    difference(...arrs: any): any[];
    /**
     * 分组
     * @param arr 数组
     * @param keyMapper 分组关键字处理器
     */
    groupBy(arr: any[], keyMapper: (cur: any) => any): any;
}
declare const _default: ArrayUtil;
export default _default;
