import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import a002 from '../../../../atoms/a002';

const logger = anylogger('pages/api/wx/s001');

export type Result = ITbswiper[];

/**
 * 获取首页轮播图列表
 */
const handler = a002<Result>();

handler.post(async (req, res) => {
	const db = an49();
	const dt = db<ITbswiper>('swiper');
	const data = await dt.select('*');
	res.status(200).json(data);
});

export const config = {} as PageConfig;

export default handler;
