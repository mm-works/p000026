import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import a003 from '../atoms/a003';
import { Col, Input, Row, Spacer } from '@geist-ui/react';
import { Message as M1, Result as R1 } from './api/pg013/s001';

const s001 = '/api/pg013/s001';
interface IProps {
	csrf: string;
}

/**
 * 登录
 */
const page: NextPage<IProps> = ({ csrf }) => {
	return (
		<>
			<Head>
				<title>登录</title>
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
	return {
		props: {
			csrf
		}
	};
};

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
				<Col span={12}>
					<Spacer y={2}></Spacer>
				</Col>
			</Row>
			<Row justify='center' align='middle'>
				<Col span={6}>
					<Row>
						<Col>
							<Input type='submit' status='secondary' value='登录' />
						</Col>
						<Spacer x={2}></Spacer>
						<Col>
							<Link href='/pg015'>
								<a>注册</a>
							</Link>
						</Col>
					</Row>
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
