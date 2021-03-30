import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an45 from '@mmstudio/an000045';
import an49 from '@mmstudio/an000049';

const logger = anylogger('pages/api/pg008/s001');

export type Result = {
	id: string;
};

/**
 * 上传首页轮播图
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const dt = an49();
	const tb = dt<ITbswiper>('swiper');
	const [info] = await an45(req);
	await tb.insert({
		id: info.id
	})
	res.status(200).json({
		id: info.id
	});
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;
