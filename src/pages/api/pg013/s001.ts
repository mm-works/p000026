import { createHash } from 'crypto';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import { sign } from 'jsonwebtoken';
import '@mmstudio/an000042';
import an47 from '@mmstudio/an000047';
import an49 from '@mmstudio/an000049';
import mmconf from '@mmstudio/config';
import a004 from '../../../atoms/a004';

const logger = anylogger('pages/api/pg013/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	usr: string;
	psw: string;
	csrf: string;
}

const session = mmconf.session as {
	secret: string;
	expiresIn: string | number;
};

/**
 * 用户名密码登录
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.post(async (req, res) => {
	const { usr, psw, csrf } = req.body as Message;
	const valid = a004(csrf);
	if (!valid) {
		res.redirect(301, '/pg014');
		return;
	}
	if (!usr || !psw) {
		res.status(500).end('Params could not be null');
		return;
	}
	const md5 = createHash('md5').update(psw).digest('hex');
	logger.debug('usr', usr, 'psw', psw, 'md5', md5);

	const db = an49();
	const type = 'user';
	const tb001 = db<ITbusers>('users');
	const tb002 = db<ITbauth>('auth');
	const r001 = await tb002.first().where('type', type).andWhere('name', usr).andWhere('token', md5);
	logger.debug('r001', r001);
	if (!r001) {
		res.status(500).end('Could not find user in table auth');
		return;
	}
	const r002 = await tb001.first().where('id', r001.userid);
	logger.debug('r002', r002);
	if (!r002) {
		res.status(500).end('Could not find user in mmtb001');
		return;
	}
	const token = sign(r002, session.secret, { expiresIn: session.expiresIn, algorithm: 'HS256' });
	logger.debug('userlogin success', usr, 'token', token);
	an47(res, 'token', token, { sameSite: 'lax', httpOnly: true });

	res.redirect('/');
});

export const config = {} as PageConfig;

export default handler;
