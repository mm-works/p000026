import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import an49 from '@mmstudio/an000049';
import { useToasts, Input, Text } from '@geist-ui/react';
import RichEditor from '../../components/c003';
import Button from '../../components/c002';
import { Message as M1, Result as R1 } from '../api/pg012/s001';
import a006 from '../../atoms/a006';
import a005 from '../../atoms/a005';

const s001 = '/api/pg012/s001';
interface IProps {
	data: ITbnews;
}

/**
 * 新闻资讯编辑
 */
const page: NextPage<IProps> = ({ data }) => {
	return (
		<>
			<Head>
				<title>新闻资讯编辑</title>
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
	const [title, settitle] = useState(data.title);
	const [content, setcontent] = useState(data.content);
	const [author, setauthor] = useState(data.author);
	const [, toast] = useToasts();
	return <>
		<Input value={data.title} onChange={(e) => {
			settitle(e.target.value);
		}}>标题</Input>
		<Text>详情</Text>
		<RichEditor defaultValue={data.content} onChange={(e) => {
			setcontent(e);
		}}></RichEditor>
		<div>
			<Input value={data.author} onChange={(e) => {
				setauthor(e.target.value);
			}} >作者</Input>
		</div>
		<div>
			<Button onClick={async () => {
				const body = {
					id: data.id,
					title,
					author,
					content
				} as M1;
				const res = await fetch(s001, {
					method: 'PUT',
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json;chatset=utf-8'
					}
				});
				const ret = await res.json() as R1;
				if (ret.ok === false) {
					toast({
						text: ret.message
					});
					return;
				}
				toast({
					text: '保存成功'
				});
			}}>保存</Button>
		</div>
	</>;
}
