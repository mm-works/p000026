import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg009/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	id: string;
}

export type Query = {

}

/**
 * 删除新闻资讯服务
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.delete(async (req, res) => {
	logger.debug('msg body:', req.body);
	const { id } = req.body as Message;
	// const { } = req.query as Query;
	const db = an49();
	const dt = db<ITbnews>('news');
	await dt.del().where({ id });
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
