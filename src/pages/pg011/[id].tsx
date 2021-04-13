import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import an49 from '@mmstudio/an000049';
import a006 from '../../atoms/a006';
import a005 from '../../atoms/a005';

interface IProps {
	data: ITbnews;
}

/**
 * 新闻资讯
 */
const page: NextPage<IProps> = ({ data }) => {
	return (
		<>
			<Head>
				<title>新闻资讯</title>
			</Head>
			<C001 data={data}></C001>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const req = context.req as NextApiRequest;
	const res = context.res as NextApiResponse;
	const user = await a006(req);
	if (!user) {
		// 跳转页面进行登录
		a005(req, res);
		return;
	}
	const id = context.params.id as string;
	const db = an49();
	const dt = db<ITbnews>('news');
	const data = await dt.first().where({ id });
	return {
		props: {
			data
		}
	};
};


/**
 * 新闻资讯详情组件
 */
function C001({ data }: { data: ITbnews; }) {
	const d = new Date();
	d.setTime(data.time);
	return <>
		<h1>{data.title}</h1>
		<h2>作者：{data.author}</h2>
		<h2>发布时间：{d.toLocaleDateString()}</h2>
		<pre dangerouslySetInnerHTML={{ __html: data.content }}>
		</pre>
	</>;
}
