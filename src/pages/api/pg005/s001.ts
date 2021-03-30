import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an49 from '@mmstudio/an000049';
import an8 from '@mmstudio/an000008';

const logger = anylogger('pages/api/pg005/s001');

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	name: string;
	color: string;
	type: number;
	sort: number;
	description: string;
	no: number;
	specifications: string;
	state: number;
	tmdown: number;
	tmup: number;
}

/**
 * 新增建材服务
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const { type, tmup, tmdown, state, specifications, no, description, sort, name, color } = req.body as Message;
	const id = an8();
	const db = an49();
	const tb = db<ITbmaterial>('material');
	await tb.insert({
		id,
		type,
		tmup,
		tmdown,
		state,
		specifications,
		no,
		description,
		sort,
		name,
		color
	});
	res.status(200).json({ ok: true });
});

export const config = {} as PageConfig;

export default handler;
