import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg001/s001/[id]');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {

}

export type Query = {
	id: string;
}

/**
 * 删除建材类型
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.delete(async (req, res) => {
	logger.debug('msg body:', req.query);
	const { id } = req.query as Query;
	if (!id) {
		res.status(500).json({
			ok: false,
			message: 'id不能为空'
		});
		return;
	}
	const db = an49();
	const dt = db<ITbtypes>('types');
	await dt.del().where({ id });
	// res.redirect('/pg001');
	res.json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
