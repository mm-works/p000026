import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import useSWR, { mutate } from 'swr';
import anylogger from 'anylogger';
import Head from 'next/head';
import Link from 'next/link';
import { Col, Row, Table } from '@geist-ui/react';
import an49 from '@mmstudio/an000049';
import Button from '../components/c002';
import Pagination from '../components/c001';

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
				<Col span={4}>
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
	const data = await dt2.select('name', 'type', 'sort').limit(pagesize).offset(offset).orderBy('sort', 'desc');
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
		<Button>新增按钮</Button>
	</>;
}

/**
 * 列表
 */
function C002({ data }: { data: ITbtypes[]; }) {
	return <>
		<Table data={data}>
			<Table.Column prop='name' label='名称' ></Table.Column>
			<Table.Column prop='type' label='类型值'></Table.Column>
			<Table.Column prop='sort' label='优先级'></Table.Column>
		</Table>
	</>;
}

/**
 * 分页
 */
function C003({ page, count }: { page: number; count: number; }) {
	return <Pagination page={page} count={count} ></Pagination>;
}
