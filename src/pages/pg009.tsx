import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Col, Row } from '@geist-ui/react';
import Button from '../components/c002';
import an49 from '@mmstudio/an000049';
import Pagination from '../components/c001';
import Link from 'next/link';

interface IProps {
	page: number;	// 当前页页码
	count: number;
	data: ITbnews[];
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
			<Row>
				<Button>
					<Link href='/pg010'>
						我要发布新资讯
					</Link>
				</Button>
			</Row>
			<Row>
				<C001 data={data}></C001>
			</Row>
			<Pagination page={page} count={count} ></Pagination>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const pagesize = 10;
	const page = Number(context.query.page) || 1;
	const offset = (page - 1) * pagesize;
	const db = an49();
	const dt1 = db<ITbnews>('news');
	const [{ size }] = await dt1.count('*', { as: 'size' });
	const total = Number(size);
	let count = parseInt(`${total / pagesize}`);
	const dt2 = db<ITbnews>('news');
	const data = await dt2.select('*').limit(pagesize).offset(offset).orderBy('time', 'desc');
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

function C001({ data }: { data: ITbnews[]; }) {
	return <ul>
		{data.map((it) => {

		})}
	</ul>;
}
