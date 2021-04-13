import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import an49 from '@mmstudio/an000049';
import { Col, Input, Row, Spacer, Text, useToasts } from '@geist-ui/react';
import Button from '../../components/c002';
import { Message as M1, Result as R1 } from '../api/pg002/s001';
import getfileuri from '../../atoms/a001';
import { Result as R2 } from '../api/pg002/s002';
import Uploader from '../../components/c004';
import a005 from '../../atoms/a005';
import a006 from '../../atoms/a006';

const s002 = '/api/pg002/s002';
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
	const [cover, setcover] = useState(data.cover);
	const [, toast] = useToasts();
	return <>
		<Head>
			<title>建材类型编辑</title>
		</Head>
		<Spacer y={6} />
		<C001><Input initialValue={data.name} onChange={(e) => {
			setname(e.target.value);
		}}>名称</Input></C001>
		<C002 value={cover} onChange={(id) => {
			setcover(id);
		}}></C002>
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
					cover,
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
	const req = context.req as NextApiRequest;
	const res = context.res as NextApiResponse;
	const user = await a006(req);
	if (!user) {
		// 跳转页面进行登录
		a005(req, res);
		return;
	}
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

/**
 * 封面
 */
function C002({ onChange, value }: { onChange(value: string): void; value: string }) {
	const endpoint = `${s002}`;
	const [cover, setcover] = useState(value);
	return <C001>
		<Text>封面图片</Text>
		{cover && <img src={getfileuri(cover)} />}
		<Uploader multiple={false} endpoint={endpoint} onChange={(v: R2) => {
			setcover(v.id)
			onChange(v.id);
		}} ></Uploader>
	</C001>;
}
