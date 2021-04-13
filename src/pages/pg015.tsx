import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { Col, Input, Row, Spacer, Radio, Text } from '@geist-ui/react';
import a003 from '../atoms/a003';
import { Message as M1, Result as R1 } from './api/pg015/s001';

const s001 = '/api/pg015/s001';
interface IProps {
	csrf: string;
}

/**
 * 注册
 */
const page: NextPage<IProps> = ({ csrf }) => {
	return (
		<>
			<Head>
				<title>注册</title>
			</Head>
			<C001 csrf={csrf} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async ({ req, res }) => {
	const csrf = a003(req as NextApiRequest, res as NextApiResponse);
	return Promise.resolve({
		props: {
			csrf
		}
	});
};

/**
 * 注册表单
 */
function C001(props: { csrf: string; }) {
	return <>
		<form action={s001} method='POST'>
			<input type='hidden' name='csrf' value={props.csrf} />
			<Row justify='center' align='middle'>
				<Col span={12}>
					<Spacer y={10}></Spacer>
				</Col>
			</Row>
			<Row justify='center' align='middle'>
				<Col span={6}>
					<Input name='usr' required>用户名:</Input>
				</Col>
			</Row>
			<Row justify='center' align='middle'>
				<Col span={6}>
					<Input.Password name='psw' required>密码:</Input.Password>
				</Col>
			</Row>
			<Row justify='center' align='middle'>
				<Col span={6}>
					<Input name='phone' required>手机号:</Input>
				</Col>
			</Row>
			<Row justify='center' align='middle'>
				<Col span={6}>
					<Text>性别</Text>
					<Radio.Group useRow value={1}>
						<Radio name='sex' value={1}>男</Radio>
						<Radio name='sex' value={0}>女</Radio>
					</Radio.Group>
				</Col>
			</Row>
			<Row justify='center' align='middle'>
				<Col span={12}>
					<Spacer y={2}></Spacer>
				</Col>
			</Row>
			<Row justify='space-around' align='middle'>
				<Col span={6}>
					<Input type='submit' status='secondary' value='Regist' />
				</Col>
			</Row>
		</form>
		<style jsx>{`
			form{
				width: 100vw;
				height: 100vh;
			}
		`}</style>
	</>;
}
