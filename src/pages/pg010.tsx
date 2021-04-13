import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { Input, Text, useToasts } from '@geist-ui/react';
import RichEditor from '../components/c003';
import Button from '../components/c002';
import { Message as M1, Result as R1 } from './api/pg010/s001';
import set from '@mmstudio/an000055';
import get from '@mmstudio/an000056';
import a006 from '../atoms/a006';
import a005 from '../atoms/a005';

const s001 = '/api/pg010/s001';
interface IProps {
}

/**
 * 发布新资讯
 */
const page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>发布新资讯</title>
			</Head>
			<C001></C001>
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
	return {
		props: {}
	};
};


/**
 * 资讯发布组件
 */
function C001() {
	const key = 'author';
	const [title, settitle] = useState('');
	const [content, setcontent] = useState('');
	const [author, setauthor] = useState('');
	const [, toast] = useToasts();
	useEffect(() => {
		setauthor(get(key, ''));
	}, []);
	async function save() {
		const body = {
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
			return false;
		}
		set(key, author);
		toast({
			text: '保存成功'
		});
		return true;
	}
	console.log('c', content);
	return <>
		<Input value={title} onChange={(e) => {
			settitle(e.target.value);
		}}>标题</Input>
		<Text>详情</Text>
		<RichEditor value={content} onChange={(e) => {
			setcontent(e);
		}}></RichEditor>
		<div>
			<Input value={author} onChange={(e) => {
				setauthor(e.target.value);
			}} >作者</Input>
		</div>
		<div>
			<Button onClick={async () => {
				if (await save()) {
					router.push('/pg009');
				}
			}}>保存</Button>
			<Button onClick={async () => {
				await save();
				settitle('');
				setcontent('');
			}}>保存并继续</Button>
		</div>
	</>;
}
