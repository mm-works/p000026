import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg002/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = ITbtypes;

/**
 * 保存类型
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', typeof req.body);
	const { id, name, sort, type, cover } = req.body as Message;
	if (!id) {
		res.status(500).json({ ok: false, message: 'id为空' });
		return;
	}
	const db = an49();
	const tb = db<ITbtypes>('types');
	await tb.update({
		name,
		cover,
		sort,
		type
	}).where({ id });
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
