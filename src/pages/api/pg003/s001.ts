import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an8 from '@mmstudio/an000008';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg003/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = Omit<ITbtypes, 'id'>;

export type Query = {

}

/**
 * 新增材料类型
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const { name, sort, type } = req.body as Message;
	const db = an49();
	const dt = db<ITbtypes>('types');
	const id = an8();
	await dt.insert({
		id,
		name,
		sort,
		type
	});
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
