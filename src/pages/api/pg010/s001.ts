import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import an8 from '@mmstudio/an000008';

const logger = anylogger('pages/api/pg010/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	title: string;
	content: string;
	author: string;
}

/**
 * 新增资讯
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const { author, content, title } = req.body as Message;
	if (!author) {
		res.status(500).json({ ok: false, message: '作者不能为空' });
		return;
	}
	if (!content) {
		res.status(500).json({ ok: false, message: '内容不能为空' });
		return;
	}
	if (!title) {
		res.status(500).json({ ok: false, message: '标题不能为空' });
		return;
	}
	const id = an8();
	const time = new Date().getTime();
	const db = an49();
	const dt = db<ITbnews>('news');
	await dt.insert({
		id,
		author,
		content,
		title,
		time
	})
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
