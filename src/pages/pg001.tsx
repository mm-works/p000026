import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage } from 'next';
import anylogger from 'anylogger';
import Head from 'next/head';
import Link from 'next/link';
import { Col, Modal, useModal, useToasts } from '@geist-ui/react';
import an49 from '@mmstudio/an000049';
import Button from '../components/c002';
import Pagination from '../components/c001';
import { Result as R1 } from './api/pg001/s001/[id]';
import getfileuri from '../atoms/a001';
import a006 from '../atoms/a006';
import a005 from '../atoms/a005';

const s001 = '/api/pg001/s001';
const logger = anylogger('pg001');
interface IProps {
	page: number;	// 当前页页码
	count: number;
	data: ITbtypes[];
}

/**
 * 建材分类
 */
const page: NextPage<IProps> = ({ count, page, data }) => {
	return (
		<>
			<Head>
				<title>建材分类</title>
			</Head>
			<C001></C001>
			<div>
				<Col>
					<C002 data={data}></C002>
				</Col>
			</div>
			<div>
				<Col>
					<C003 count={count} page={page}></C003>
				</Col>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const req = context.req as NextApiRequest;
	const res = context.res as NextApiResponse;
	const user = await a006(req);
	if (!user) {
		// 跳转页面进行登录
		a005(req, res);
		return {
			props: {
				count: 0,
				data: null,
				page: 0
			}
		};
	}
	const pagesize = 10;
	const page = Number(context.query.page) || 1;
	const offset = (page - 1) * pagesize;
	const db = an49();
	const dt1 = db<ITbtypes>('types');
	const [{ size }] = await dt1.count('*', { as: 'size' });
	const total = Number(size);
	let count = parseInt(`${total / pagesize}`);
	const dt2 = db<ITbtypes>('types');
	const data = await dt2.select('*').limit(pagesize).offset(offset).orderBy('sort', 'desc');
	if (total % pagesize) {
		++count;
	}
	logger.debug('page', page);
	logger.debug('count', count);
	logger.debug('data', data);
	return {
		props: {
			count,
			data,
			page
		}
	};
};

export default page;

/**
 * 新增按钮
 */
function C001() {
	return <>
		<div>
			<Link href='/pg003'>
				<a target='_blank'>
					新增
				</a>
			</Link>
		</div>
		<style jsx>{`
div::before{
content: '+++';
font-size: 1.5rem;
color: #2b81a3a4;
}
div{
float: right;
font-size: 2rem;
margin-right: 10rem;
}
`}</style>
	</>;
}

/**
 * 列表
 */
function C002({ data }: { data: ITbtypes[]; }) {
	return <>
		<table>
			<tbody>
				{data.map((it, key) => {
					return <tr key={key}>
						<td className='cls001'>
							<Link href={`/pg002/${it.id}`}>
								<a>
									{it.cover ? <img width={200} src={getfileuri(it.cover)} />
										: <span>缺少封面图</span>
									}
								</a>
							</Link>
						</td>
						<td>
							<Link href={`/pg002/${it.id}`}>
								<a title={it.name}>
									<div>{it.name}</div>
									<div>
										<span>类型:<span>{it.type}</span></span>
									</div>
									<div>
										<span title='数值越大,排序越靠前'>排序:<span>{it.sort}</span></span>
									</div>
								</a>
							</Link>
						</td>
						<td>
							<Button>
								<Link href={`/pg002/${it.id}`}>编辑</Link>
							</Button>
							<Button>
								<Link href={`/pg004/${it.type}`}>材料管理</Link>
							</Button>
							<C004 data={it}></C004>
						</td>
					</tr>
				})}
			</tbody>
		</table>
		<style jsx>{`
.cls001{
width: 200px;
padding-left: 2rem;
}
table{
width:80%;
margin-left: auto;
margin-right: auto;
}
tbody{
text-align: center;
}
tr{
border-style: dashed;
}
td{
padding:0;
border-style: dashed;
border-width: 0.1rem;
border-left-style: none;
border-right-style: none;
font-size:1.2rem;
color: #316e57;
}
`}</style>
	</>;
}

/**
 * 分页
 */
function C003({ page, count }: { page: number; count: number; }) {
	return <div>
		<Pagination page={page} count={count} ></Pagination>
		<style jsx>{`
div{
float: right;
margin-right: 10rem;
}
`}</style>
	</div>
}

/**
 * 删除按钮
 */
function C004({ data }: { data: ITbtypes; }) {
	const { setVisible, bindings } = useModal();
	const [, toast] = useToasts();
	const url = `${s001}/${data.id}`;
	return <>
		<Button type='error' onClick={() => {
			setVisible(true);
		}}>删除</Button>
		<Modal {...bindings}>
			<Modal.Title>提示</Modal.Title>
			<Modal.Subtitle>删除提示</Modal.Subtitle>
			<Modal.Content>
				<p>确定要删除该分类吗？删除时需要保证该分类下所有材料已删除。</p>
			</Modal.Content>
			<Modal.Action passive onClick={() => {
				setVisible(false);
			}}>取消</Modal.Action>
			<Modal.Action onClick={async () => {
				const res = await fetch(url, {
					method: 'DELETE'
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
	</>;
}
