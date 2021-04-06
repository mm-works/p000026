import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg012/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = Omit<ITbnews, 'time'>;

/**
 * 编辑修改新闻资讯
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const { id, ...rest } = req.body as Message;
	const db = an49();
	const dt = db<ITbnews>('news');
	await dt.update({
		...rest,
		time: new Date().getTime()
	}).where({ id });
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
