import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import a002 from '../../../../atoms/a002';

const logger = anylogger('pages/api/wx/s001');

export type Result = ITbmaterial[];

export type Message = {
	type: number;
}

/**
 * 根据分类获取建材列表
 */
const handler = a002<Result>();

handler.post(async (req, res) => {
	logger.debug('message body', req.body);
	const db = an49();
	const dt = db<ITbmaterial>('material');
	const { type } = req.body as Message;
	const data = await dt.select('*').where({ type }).orderBy('sort', 'desc');
	logger.debug('轮播图', data);
	res.status(200).json(data);
});

export const config = {} as PageConfig;

export default handler;
