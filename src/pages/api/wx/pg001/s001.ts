import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import a002 from '../../../../atoms/a002';

const logger = anylogger('pages/api/wx/s001');

export type Result = {
	data1: ITbswiper[];
	data2: ITbtypes[];
};

/**
 * 获取首页轮播图列表
 */
const handler = a002<Result>();

handler.post(async (req, res) => {
	const db = an49();
	const dt1 = db<ITbswiper>('swiper');
	const data1 = await dt1.select('*');
	logger.debug('轮播图', data1);
	const dt2 = db<ITbtypes>('types');
	const data2 = await dt2.select('*').orderBy('sort', 'desc');
	logger.debug('建材类型', data2);
	res.status(200).json({
		data1,
		data2
	});
});

export const config = {} as PageConfig;

export default handler;
