import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import a002 from '../../../../atoms/a002';

const logger = anylogger('pages/api/wx/s001');

export type Result = ITbnews | {
	ok: false,
	message: string;
};

export type Message = {
	id: string;
}

/**
 * 新闻列表
 */
const handler = a002<Result>();

handler.post(async (req, res) => {
	logger.debug('message body', req.body);
	const db = an49();
	const { id } = req.body as Message;
	if (!id) {
		res.status(500).json({
			ok: false,
			message: 'id为空'
		});
		return;
	}

	const dt = db<ITbnews>('news');
	const data = await dt.first('*').where({ id });
	res.status(200).json(data);
});

export const config = {} as PageConfig;

export default handler;
