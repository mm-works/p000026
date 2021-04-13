import { NextApiRequest } from 'next';
import an39 from '@mmstudio/an000039';
import a004 from './a004';

const csrf_name = '_mmcsrf-token';

/**
 * 获取用户信息
 */
export default function a006(req: NextApiRequest) {
	const cookies = req.cookies;
	const csrf = cookies[csrf_name];
	const valid = a004(csrf);
	if (!valid) {
		return null;
	}

	const token = cookies.token;
	return an39<ITbusers>(token);
}
