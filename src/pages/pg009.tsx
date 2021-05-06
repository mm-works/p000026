import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Modal, useModal, useToasts } from '@geist-ui/react';
import Button from '../components/c002';
import an49 from '@mmstudio/an000049';
import Pagination from '../components/c001';
import Link from 'next/link';
import { Message as M1, Query as Q1, Result as R1 } from './api/pg009/s001';
import a006 from '../atoms/a006';
import a005 from '../atoms/a005';

const s001 = '/api/pg009/s001';
type IData = Pick<ITbnews, 'id' | "title" | "time">;

interface IProps {
	page: number;	// 当前页页码
	count: number;
	data: IData[];
}

/**
 * 资讯发布
 */
const page: NextPage<IProps> = ({ page, count, data }) => {
	return (
		<>
			<Head>
				<title>资讯发布</title>
			</Head>
			<div className='cls001'>
				<Button>
					<Link href='/pg010'>
						<a className='cls002' target='_blank'>
							发布新资讯
						</a>
					</Link>
				</Button>
			</div>
			<div>
				<C001 data={data}></C001>
			</div>
			<Pagination page={page} count={count} ></Pagination>
			<style jsx>{`
.cls001{
display: flex;
justify-content: center;
}
.cls002:hover{
color:#fff;
}
`}</style>
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
	const pagesize = 10;
	const page = Number(context.query.page) || 1;
	const offset = (page - 1) * pagesize;
	const db = an49();
	const dt1 = db<ITbnews>('news');
	const [{ size }] = await dt1.count('*', { as: 'size' });
	const total = Number(size);
	let count = parseInt(`${total / pagesize}`);
	const dt2 = db<ITbnews>('news');
	const data = await dt2.select('id', 'title', 'time').limit(pagesize).offset(offset).orderBy('time', 'desc');
	if (total % pagesize) {
		++count;
	}

	return {
		props: {
			count,
			data,
			page
		}
	};
};

/**
 * 资讯列表
 */
function C001({ data }: { data: IData[]; }) {
	return <div>
		{data.map((it, key) => {
			return <C002 key={key} data={it}></C002>
		})}
	</div>;
}

/**
 * 资讯列表行数据
 * @param param0 
 */
function C002({ data }: { data: IData; }) {
	const { setVisible, bindings } = useModal();
	const [, toast] = useToasts();
	const href = `/pg011/${data.id}`;
	const t = new Date();
	t.setTime(data.time);
	const tm = t.toLocaleDateString();
	const title = data.title;
	const url = s001;
	const id = data.id;
	const edit = `/pg012/${id}`;
	return <div className='cls001'>
		<span >
			<Link href={href}>
				<a className='cls002'>
					<h5>{title}</h5>
					<div>发布时间:{tm}</div>
				</a>
			</Link>
		</span>
		<span >
			<Link href={edit}>
				<a>编辑</a>
			</Link>
			<Button type='error' onClick={async () => {
				setVisible(true);
			}}>删除</Button>
			<Modal {...bindings}>
				<Modal.Title>提示</Modal.Title>
				<Modal.Subtitle>删除提示</Modal.Subtitle>
				<Modal.Content>
					<p>确定要删除该新闻吗？</p>
				</Modal.Content>
				<Modal.Action passive onClick={() => {
					setVisible(false);
				}}>取消</Modal.Action>
				<Modal.Action onClick={async () => {
					const body = { id } as M1;
					const res = await fetch(url, {
						method: 'DELETE',
						body: JSON.stringify(body),
						headers: {
							'Content-Type': 'application/json;charset=utf-8'
						}
					});
					setVisible(false);
					const ret = await res.json() as R1;
					if (ret.ok === false) {
						toast({ text: ret.message });
					} else {
						toast({ text: 'Success' });
						window.location.reload();
					}
				}}>确定</Modal.Action>
			</Modal>
		</span>
		<style jsx>{`
.cls001{
transition: all 500ms;
}
.cls001:hover{
background-color: silver;
}
.cls002:hover{
background-color: red;
}
`}</style>
	</div>;
}
