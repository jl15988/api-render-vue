import ArrayUtil from "./ArrayUtil";

/**
 * 树节点处理函数
 * @param current 当前元素
 * @param parent 父级元素
 * @param parentChildList 父级子元素集合
 * @param level 当前层级
 */
export type TreeNodeMapper = (current: any, parent?: any, parentChildList?: any[], level?: number) => any;
/**
 * 树叶子节点处理函数
 * @param current 当前元素
 */
export type TreeLeafNodeMapper = (current: any) => any;

class TreeUtil {

    /**
     * 默认的级别属性名
     */
    LEVEL_NAME = '__tree_level';
    /**
     * 默认的开始级别
     */
    LEVEL_BEGIN = 1;
    /**
     * 已构建标记
     */
    BUILT_TAG = '__built_tag';

    /**
     * 构建树结构（保留非根节点）
     * @param list 数组
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param childName 子节点属性名
     * @param levelName 级别属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string, mapper?: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): any[] {
        if (!list) return [];
        let newList = ArrayUtil.deepCopy(list);
        levelName = levelName || this.LEVEL_NAME;
        this.buildTreeMapper(newList, idName, parentName, (current, parent, parentChildList, level) => {
            if (level !== this.LEVEL_BEGIN) {
                // 根节点遍历时没有父级
                parent[childName] = parentChildList;
            }
            current[levelName] = level;
            mapper && mapper(current, parent, parentChildList, level);
            return current;
        }, leafMapper);
        return newList;
    }

    /**
     * 构建树结构
     * @param list 数组
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param childName 子节点属性名
     * @param levelName 级别属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildCommonTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string, mapper?: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): any[] {
        return this.filterRoot(this.buildTree(list, idName, parentName, childName, levelName, mapper, leafMapper))
    }

    /**
     * 获取根节点数组（用于构建树结构后清楚非根节点数据）
     * @param list 数组
     * @param levelName 级别属性名
     */
    filterRoot(list: any[], levelName?: string) {
        levelName = levelName || this.LEVEL_NAME;
        return list.filter(item => item[levelName] === this.LEVEL_BEGIN);
    }

    /**
     * 递归树结构变换器
     * @param list 全数组
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildTreeMapper(list: any[], idName: string, parentName: string, mapper: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): void {
        if (ArrayUtil.isEmpty(list)) return;
        for (let item of list) {
            const level = this.LEVEL_BEGIN;
            if (item[this.BUILT_TAG]) return;
            mapper && mapper(item, null, [], level);
            this.toTreeMapper(list, item, idName, parentName, mapper, leafMapper, level);
        }
    }

    /**
     * 递归树结构变换器
     * @param list 全数组
     * @param obj 父级节点
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     * @param parentLevel 上级层级
     */
    toTreeMapper(list: any[], obj: any, idName: string, parentName: string, mapper: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper, parentLevel?: number): void {
        const childList = [];
        for (let item of list) {
            if (item[parentName] === obj[idName]) {
                item[this.BUILT_TAG] = true;
                childList.push(item);
            }
        }
        if (childList.length > 0) {
            for (let children of childList) {
                const level = (!parentLevel ? this.LEVEL_BEGIN - 1 : parentLevel) + 1;
                const child = mapper ? mapper(children, obj, childList, level) : children;
                this.toTreeMapper(list, child, idName, parentName, mapper, leafMapper, level);
            }
        } else {
            leafMapper && leafMapper(obj);
        }
    }
}

export default new TreeUtil()
