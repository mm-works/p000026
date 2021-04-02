import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an45 from '@mmstudio/an000045';

const logger = anylogger('pages/api/pg006/s002');

export type Result = {
	id: string;
};

export type Message = {

}

export type Query = {

}

/**
 * 上传建材封面图片
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	// logger.debug('msg body:', req.body);
	const [file] = await an45(req);
	logger.debug('file uploaded', file);
	res.status(200).json({ id: file.id });
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;
