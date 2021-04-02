/**
 * 建材
 */
interface ITbmaterial {
	/**
	 * ID
	 */
	id: string;
	/**
	 * 名称
	 */
	name: string;
	/**
	 * 类型:types.type
	 */
	type: number;
	/**
	 * 封面
	 */
	cover: string;
	/**
	 * 颜色
	 */
	color: string;
	/**
	 * 价格
	 */
	price: number;
	/**
	 * 规格
	 */
	specifications: string;
	/**
	 * 描述
	 */
	description: string;
	/**
	 * 存货数量
	 */
	no: number;
	/**
	 * 状态：1 在售 2 已下架
	 */
	state: number;
	/**
	 * 上架时间
	 */
	tmup: number;
	/**
	 * 下架时间
	 */
	tmdown: number;
	/**
	 * 排序
	 */
	sort: number;
}
