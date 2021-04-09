import { GetServerSideProps, NextPage } from 'next';
import anylogger from 'anylogger';
import Head from 'next/head';
import Link from 'next/link';
import { Col, Modal, Row, Table, useModal, useToasts } from '@geist-ui/react';
import an49 from '@mmstudio/an000049';
import Button from '../components/c002';
import Pagination from '../components/c001';
import { Result as R1 } from './api/pg001/s001/[id]';
import getfileuri from '../atoms/a001';

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
			<Row justify='end'>
				<Col span={5}>
					<C001></C001>
				</Col>
			</Row>
			<Row>
				<Col>
					<C002 data={data}></C002>
				</Col>
			</Row>
			<Row>
				<Col>
					<C003 count={count} page={page}></C003>
				</Col>
			</Row>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
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
		<Row>
			<Col>
				<Button>
					<Link href='/pg003'>
						新增
			</Link>
				</Button>
			</Col>
			<Col>
				<Button>
					<Link href='/pg008'>
						首页轮播图
			</Link>
				</Button>
			</Col>
		</Row>
	</>;
}

/**
 * 列表
 */
function C002({ data: original }: { data: ITbtypes[]; }) {
	const data = original.map((it) => {
		const name = <>
			<Link href={`/pg002/${it.id}`}>{it.name}</Link>
		</>;
		const cover = it.cover && <>
			<Link href={`/pg002/${it.id}`}>
				<a>
					<img width={200} src={getfileuri(it.cover)} />
				</a>
			</Link>
		</>;
		const op = <>
			<Button>
				<Link href={`/pg002/${it.id}`}>编辑</Link>
			</Button>
			<Button>
				<Link href={`/pg004/${it.type}`}>材料管理</Link>
			</Button>
			<C004 data={it}></C004>
		</>;
		return {
			...it,
			name,
			op,
			cover
		};
	});
	return <>
		<Table data={data}>
			<Table.Column prop='name' label='名称' ></Table.Column>
			<Table.Column prop='type' label='类型值'></Table.Column>
			<Table.Column prop='sort' label='优先级'></Table.Column>
			<Table.Column prop='cover' label='封面图片'></Table.Column>
			<Table.Column prop='op' label='操作'></Table.Column>
		</Table>
	</>;
}

/**
 * 分页
 */
function C003({ page, count }: { page: number; count: number; }) {
	return <Pagination page={page} count={count} ></Pagination>;
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
