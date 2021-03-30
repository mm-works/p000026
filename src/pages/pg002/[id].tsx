import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import an49 from '@mmstudio/an000049';
import { Col, Input, Row, Spacer, useToasts } from '@geist-ui/react';
import Button from '../../components/c002';
import { Message as M1, Query as Q1, Result as R1 } from '../api/pg002/s001';

const s001 = '/api/pg002/s001';
interface IProps {
	data: ITbtypes;
}

/**
 * 建材类型编辑
 */
const page: NextPage<IProps> = ({ data }) => {
	const id = data.id;
	const [name, setname] = useState(data.name);
	const [type, settype] = useState(data.type);
	const [sort, setsort] = useState(data.sort);
	const [, toast] = useToasts();
	return <>
		<Head>
			<title>建材类型编辑</title>
		</Head>
		<Spacer y={6} />
		<C001><Input initialValue={data.name} onChange={(e) => {
			setname(e.target.value);
		}}>名称</Input></C001>
		<C001><Input type='number' min={0} initialValue={data.type.toString()} onChange={(e) => {
			settype(Number(e.target.value));
		}}>类型值</Input></C001>
		<C001><Input type='number' initialValue={data.sort.toString()} onChange={(e) => {
			setsort(Number(e.target.value));
		}}>优先级(数字越大，优先级越高)</Input></C001>
		<Spacer y={3} />
		<C001>
			<Button auto={false} onClick={async () => {
				// save
				const data = {
					id,
					name,
					type,
					sort
				} as M1;
				const body = JSON.stringify(data);
				const res = await fetch(s001, {
					method: 'PUT',
					body,
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					}
				});
				const ret = await res.json() as R1;
				if (ret.ok === false) {
					toast({
						text: ret.message
					});
				} else {
					toast({
						text: 'Success.'
					});
				}
			}}>保存</Button>
		</C001>
	</>;
};

export const config: PageConfig = {
	amp: false
};

export default page;

export const getServerSideProps: GetServerSideProps<IProps, { id: string; }> = async (context) => {
	const id = context.params.id;
	const db = an49();
	const dt = db<ITbtypes>('types');
	const data = await dt.first('*').where({
		id
	});
	return {
		props: {
			data
		}
	};
};

function C001({ children }: { children: ReactNode; }) {
	return <Row justify='center'>
		<Col span={6}>{children}</Col>
	</Row>;
}
