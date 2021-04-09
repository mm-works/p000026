import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import an49 from '@mmstudio/an000049';
import { Col, Modal, Row, Table, useModal, useToasts } from '@geist-ui/react';
import Link from 'next/link';
import Button from '../../components/c002';
import Pagination from '../../components/c001';
import { Result as R1 } from '../api/pg004/s001/[id]';
import getfileuri from '../../atoms/a001';

const s001 = '/api/pg004/s001';


type IData = Pick<ITbmaterial, "id" | "name" | "type" | "cover" | "color" | "price" | "specifications" | "no" | "state" | "tmup" | "tmdown" | "sort">;

interface IProps {
	page: number;
	count: number;
	data: IData[];
	type: number;
}

/**
 * 建材列表
 */
const page: NextPage<IProps> = ({ count, data, page, type }) => {
	return (
		<>
			<Head>
				<title>建材列表</title>
			</Head>
			<Row justify='end'>
				<Col span={4}>
					<C001 type={type}></C001>
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

export const config: PageConfig = {
	amp: false
};

export default page;

export const getServerSideProps: GetServerSideProps<IProps, { type: string; }> = async (context) => {
	const type = Number(context.params.type);
	const pagesize = 10;
	const page = Number(context.query.page) || 1;
	const offset = (page - 1) * pagesize;
	const db = an49();
	const dt1 = db<ITbmaterial>('material');
	const [{ size }] = await dt1.count('*', { as: 'size' });
	const total = Number(size);
	let count = parseInt(`${total / pagesize}`);
	const dt2 = db<ITbmaterial>('material');
	const data = await dt2.select('color', 'cover', 'id', 'name', 'no', 'price', 'sort', 'specifications', 'state', 'tmdown', 'tmup', 'type').where({
		type
	}).limit(pagesize).offset(offset).orderBy('sort', 'desc');
	if (total % pagesize) {
		++count;
	}
	return {
		props: {
			page,
			count,
			data,
			type
		}
	};
};

/**
 * 新增按钮
 */
function C001({ type }: { type: number; }) {
	const href = `/pg005/${type}`;
	return <>
		<Button>
			<Link href={href}>
				新增
			</Link>
		</Button>
	</>;
}

function formatdt(tm: number) {
	if (!tm) {
		return '';
	}
	return new Date(Number(tm)).toLocaleDateString();
}

/**
 * 列表
 */
function C002({ data: original }: { data: IData[]; }) {
	const data = original.map((it) => {
		const name = <>
			<Link href={`/pg006/${it.id}`}>{it.name}</Link>
		</>;
		const cover = it.cover && <img src={getfileuri(it.cover)} />;
		const op = <>
			<Button>
				<Link href={`/pg006/${it.id}`}>编辑</Link>
			</Button>
			<Button>
				<Link href={`/pg007/${it.id}`}>轮播图片</Link>
			</Button>
			<C004 data={it}></C004>
		</>;
		return {
			...it,
			cover,
			state: it.state === 2 ? '已下架' : '在售',
			tmup: formatdt(it.tmup),
			tmdown: formatdt(it.tmdown),
			name,
			op
		};
	});
	return <>
		<Table data={data}>
			<Table.Column prop='name' label='名称' ></Table.Column>
			<Table.Column prop='cover' label='封面图片' ></Table.Column>
			<Table.Column prop='color' label='颜色' ></Table.Column>
			<Table.Column prop='price' label='价格' ></Table.Column>
			<Table.Column prop='specifications' label='规格' ></Table.Column>
			<Table.Column prop='no' label='存货数量' ></Table.Column>
			<Table.Column prop='state' label='状态：1 在售 2 已下架' ></Table.Column>
			<Table.Column prop='tmup' label='上架时间'></Table.Column>
			<Table.Column prop='tmdown' label='下架时间'></Table.Column>
			<Table.Column prop='sort' label='优先级'></Table.Column>
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
function C004({ data }: { data: IData; }) {
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
				<p>确定要删除吗？</p>
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
