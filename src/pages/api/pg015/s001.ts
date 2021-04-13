import { createHash } from 'crypto';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import an8 from '@mmstudio/an000008';
import an49 from '@mmstudio/an000049';
import '@mmstudio/an000042';
import a004 from '../../../atoms/a004';

const logger = anylogger('pages/api/pg015/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	usr: string;
	psw: string;
	phone: string;
	sex: '1' | '0';
	csrf: string;
}

/**
 * 注册服务
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.post(async (req, res) => {
	logger.debug('NODE_ENV', process.env.NODE_ENV);
	if (process.env.NODE_ENV === 'production') {
		res.status(500).end('不允许注册,请联系管理员');
		return;
	}
	logger.debug('message', req.body);
	const { usr, psw, csrf, phone, sex } = req.body as Message;
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
	const r001 = await tb002.count().where('type', type).andWhere('name', usr);
	logger.debug('r001', r001);
	if (r001[0].count > 0) {
		res.status(500).end('Username already been used');
		return;
	}
	const id = an8();
	await tb001.insert({
		id,
		name: usr,
		phone,
		sex: Number(sex)
	});
	const headers = req.headers;
	const ip = headers['x-real-ip'] as string || headers['x-forwarded-for'] as string || // 判断是否有反向代理 IP
		req.connection.remoteAddress || // 判断 connection 的远程 IP
		req.socket.remoteAddress; // 判断后端的 socket 的 IP
	await tb002.insert({
		id: an8(),
		userid: id,
		type,
		name: usr,
		token: md5,
		lastactive: new Date().getTime(),
		lastip: ip
	});

	res.redirect('/pg013');	// jump to signin page
});

export const config = {} as PageConfig;

export default handler;
