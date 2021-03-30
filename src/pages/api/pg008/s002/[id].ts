import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an53 from '@mmstudio/an000053';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg008/s002');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Query = {
	id: string;
}

/**
 * 删除文件服务
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.delete(async (req, res) => {
	logger.debug('msg body:', req.query);
	const { id } = req.query as Query;
	const db = an49();
	const dt = db<ITbswiper>('swiper');
	await dt.del().where({
		id
	});
	await an53(id);
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
