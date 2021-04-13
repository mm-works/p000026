import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an51 from '@mmstudio/an000051';

const logger = anylogger('api/s002');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

/**
 * 退出登录
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.get((req, res) => {
	logger.info('logout using get method.');
	an51(req, res, 'token', {
		sameSite: 'lax'
	});
	res.redirect('/');
}).post((req, res) => {
	logger.info('logout using post method.');
	an51(req, res, 'token', {
		sameSite: 'lax'
	});
	res.status(200).json({ ok: true });
});


export const config = {} as PageConfig;

export default handler;
