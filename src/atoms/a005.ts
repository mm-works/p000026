import { NextApiRequest, NextApiResponse } from 'next';
import an52 from '@mmstudio/an000052';

/**
 * 页面跳转 redirect
 */
export default function a005(req: NextApiRequest, res: NextApiResponse) {
	const url = './pg013';
	return an52(req, res, url);
}
