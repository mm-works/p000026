/**
 * 用户授权信息
 */
interface ITbauth {
	/**
	 * 用户授权信息id
	 */
	id: string;
	/**
	 * 用户ID，users.id
	 */
	userid: string;
	/**
	 * 登录类型（手机号 邮箱 用户名）或第三方应用名称（微信 微博等）
	 */
	type: string;
	/**
	 * 标识（手机号 邮箱 用户名或第三方应用的唯一标识）
	 */
	name: string;
	/**
	 * 密码凭证（站内的保存密码，站外的不保存或保存token）
	 */
	token: string;
	/**
	 * 最后一次关键性操作时间
	 */
	lastactive: number;
	/**
	 * 最后一次关键性操作ip地址
	 */
	lastip: string;
}
