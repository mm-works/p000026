import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { ReactNode, useState } from 'react';
import { Col, Input, Row, Spacer, useToasts } from '@geist-ui/react';
import Button from '../components/c002';
import { Message as M1, Result as R1 } from './api/pg003/s001';

const s001 = '/api/pg003/s001';
interface IProps {
}

/**
 * 新增建材类型
 */
const page: NextPage<IProps> = () => {
	const [name, setname] = useState('');
	const [type, settype] = useState(0);
	const [sort, setsort] = useState(0);
	const [, toast] = useToasts();
	return (
		<>
			<Head>
				<title>新增建材类型</title>
			</Head>
			<Spacer y={6} />
			<C001><Input onChange={(e) => {
				setname(e.target.value);
			}}>名称</Input></C001>
			<C001><Input type='number' min={0} onChange={(e) => {
				settype(Number(e.target.value));
			}}>类型值</Input></C001>
			<C001><Input type='number' onChange={(e) => {
				setsort(Number(e.target.value));
			}}>优先级(数字越大，优先级越高)</Input></C001>
			<Spacer y={3} />
			<C001>
				<Button auto={false} onClick={async () => {
					// save
					const data = {
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
						await router.push('pg001');
					}
				}}>保存</Button>
			</C001>

		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

function C001({ children }: { children: ReactNode; }) {
	return <Row justify='center'>
		<Col span={6}>{children}</Col>
	</Row>;
}
