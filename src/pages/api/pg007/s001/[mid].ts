import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an45 from '@mmstudio/an000045';
import an49 from '@mmstudio/an000049';
import an8 from '@mmstudio/an000008';

const logger = anylogger('pages/api/pg007/s001');

export type Result = {
	id: string;
	fid: string;
};

export type Query = {
	mid: string;
}

/**
 * 保存文件服务
 */
const handler = nextConnect<NextApiRequest, NextApiResponse<Result>>();

handler.put(async (req, res) => {
	logger.debug('msg body:', req.body);
	const { mid } = req.query as Query;
	if (!mid) {
		res.status(500).end('缺少参数');
		return;
	}
	const id = an8();
	const dt = an49();
	const tb = dt<ITbpictures>('pictures');
	const [info] = await an45(req);
	await tb.insert({
		id,
		mid,
		src: info.id
	})
	res.status(200).json({
		id,
		fid: info.id
	});
});

export const config = {
	api: {
		bodyParser: false
	}
} as PageConfig;

export default handler;
