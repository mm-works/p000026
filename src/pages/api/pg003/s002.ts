import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an45 from '@mmstudio/an000045';

const logger = anylogger('pages/api/pg003/s002');

export type Result = {
	ok: true;
	id: string;
} | {
	ok: false;
	message: string;
};

export type Message = {

}

export type Query = {

}

/**
 * 上传封面服务
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const [info] = await an45(req);
	res.status(200).json({ ok: true, id: info.id });
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;
