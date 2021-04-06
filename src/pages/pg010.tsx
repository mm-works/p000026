import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { Input, Text, useToasts } from '@geist-ui/react';
import RichEditor from '../components/c003';
import Button from '../components/c002';
import { Message as M1, Result as R1 } from './api/pg010/s001';

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

/**
 * 资讯发布组件
 */
function C001() {
	const [title, settitle] = useState('');
	const [content, setcontent] = useState('');
	const [author, setauthor] = useState('');
	const [, toast] = useToasts();
	return <>
		<Input onChange={(e) => {
			settitle(e.target.value);
		}}>标题</Input>
		<Text>详情</Text>
		<RichEditor onChange={(e) => {
			setcontent(e);
		}}></RichEditor>
		<div>
			<Input onChange={(e) => {
				setauthor(e.target.value);
			}} >作者</Input>
		</div>
		<div>
			<Button onClick={async () => {
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
					return;
				}
				router.push('/pg009');
			}}>保存</Button>
		</div>
	</>;
}
