import { createHash, randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import an50 from '@mmstudio/an000050';

// config here
const csrf_name = '_mmcsrf-token';
const secret = 'mmstudio';

/**
 * 获取csrf
 */
export default function a003(req: NextApiRequest, res: NextApiResponse) {
	const cookies = req.cookies;
	let csrf = cookies[csrf_name];

	if (!csrf) {
		// If no csrfToken - because it's not been set yet, or because the hash doesn't match
		// (e.g. because it's been modifed or because the secret has changed) create a new token.
		const csrfTokenFromCookie = randomBytes(32).toString('hex');
		const newCsrfTokenCookie = `${csrfTokenFromCookie}|${createHash('sha256').update(`${csrfTokenFromCookie}${secret}`).digest('hex')}`;
		csrf = String(newCsrfTokenCookie);
		an50(req, res, csrf_name, csrf, {
			sameSite: 'lax',
			httpOnly: true,
			path: '/'
		});
	}
	return csrf;
}
