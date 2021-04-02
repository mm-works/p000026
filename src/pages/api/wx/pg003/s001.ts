import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import a002 from '../../../../atoms/a002';

const logger = anylogger('pages/api/wx/s001');

export type Result = {
	data1: ITbmaterial;
	data2: Pick<ITbpictures, "src">[];
};

export type Message = {
	id: string;
}

/**
 * 根据id获取建材详情及轮播图
 */
const handler = a002<Result>();

handler.post(async (req, res) => {
	logger.debug('message body', req.body);
	const db = an49();
	const { id } = req.body as Message;
	const dt1 = db<ITbmaterial>('material');
	const data1 = await dt1.first('*').where({ id });
	logger.debug('建材信息', data1);
	const dt2 = db<ITbpictures>('pictures');
	const data2 = await dt2.select('src').where({
		mid: id
	});
	res.status(200).json({
		data1,
		data2
	});
});

export const config = {} as PageConfig;

export default handler;
