import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import a002 from '../../../../atoms/a002';

const logger = anylogger('pages/api/wx/s001');

export type IData = Pick<ITbnews, 'id' | 'title' | 'time'>;

export type Result = {
	ok: true;
	data: IData[];
	// count: number;
} | {
	ok: false;
	message: string;
};

export type Message = {
	page: number;
}

/**
 * 新闻列表
 */
const handler = a002<Result>();

handler.post(async (req, res) => {
	logger.debug('message body', req.body);
	const db = an49();
	const { page } = req.body as Message;
	if (!page) {
		res.status(500).json({
			ok: false,
			message: '页码为空'
		});
		return;
	}

	const pagesize = 10;
	const offset = (page - 1) * pagesize;
	const dt1 = db<ITbnews>('news');
	const [{ size }] = await dt1.count('*', { as: 'size' });
	const total = Number(size);
	let count = parseInt(`${total / pagesize}`);
	const dt2 = db<ITbnews>('news');
	const data = await dt2.select('id', 'title', 'time').limit(pagesize).offset(offset).orderBy('time', 'desc');
	if (total % pagesize) {
		++count;
	}

	res.status(200).json({
		ok: true,
		// count,
		data
	});
});

export const config = {} as PageConfig;

export default handler;
