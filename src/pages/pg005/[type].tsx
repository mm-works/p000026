import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { ReactNode, useState } from 'react';
import { Col, Input, Row, Spacer, Text, useToasts } from '@geist-ui/react';
import Button from '../../components/c002';
import RichEditor from '../../components/c003';
import { Message as M1, Result as R1 } from '../api/pg005/s001';
import a006 from '../../atoms/a006';
import a005 from '../../atoms/a005';

const s001 = '/api/pg005/s001';
interface IProps {
	type: number;
}

/**
 * 新增建材
 */
const page: NextPage<IProps> = ({ type }) => {
	const [name, setname] = useState('');
	const [color, setcolor] = useState('');
	const [specifications, setspecifications] = useState('');
	const [description, setdescription] = useState('');
	const [no, setno] = useState(999);
	const [state, setstate] = useState(1);
	const [price, setprice] = useState(99);
	const [tmup, settmup] = useState<number>();
	const [tmdown, settmdown] = useState<number>();
	const [sort, setsort] = useState(0);
	const [, toast] = useToasts();
	return (
		<>
			<Head>
				<title>新增建材</title>
			</Head>
			<Spacer y={6} />
			<C001><Input onChange={(e) => {
				setname(e.target.value);
			}}>名称</Input></C001>
			<C001><Input onChange={(e) => {
				setcolor(e.target.value);
			}}>颜色</Input></C001>
			<C001><Input value={`${price}`} type='number' onChange={(e) => {
				setprice(Number(e.target.value));
			}}>价格</Input></C001>
			<C001><Input onChange={(e) => {
				setspecifications(e.target.value);
			}}>规格</Input></C001>
			<C001>
				<Text>描述</Text>
				<RichEditor value={description} onChange={(e) => {
					setdescription(e);
				}}></RichEditor></C001>
			<C001><Input value={`${no}`} type='number' onChange={(e) => {
				setno(Number(e.target.value));
			}}>存货数量</Input></C001>
			<C001><Input value={`${state}`} type='number' onChange={(e) => {
				setstate(Number(e.target.value));
			}}>状态：1 在售 2 已下架</Input></C001>
			<C001><Input type='date' onChange={(e) => {
				settmup(new Date(e.target.value).getTime());
			}}>上架时间</Input></C001>
			<C001><Input type='date' onChange={(e) => {
				settmdown(new Date(e.target.value).getTime());
			}}>下架时间</Input></C001>
			<C001><Input value={`${sort}`} type='number' onChange={(e) => {
				setsort(Number(e.target.value));
			}}>优先级(数字越大，优先级越高)</Input></C001>
			<Spacer y={3} />
			<C001>
				<Button auto={false} onClick={async () => {
					// save
					const data = {
						name,
						color,
						type,
						price,
						sort,
						description,
						no,
						specifications,
						state,
						tmdown,
						tmup
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
						await router.push(`/pg004/${type}`);
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
		<Col span={18}>{children}</Col>
	</Row>;
}

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const req = context.req as NextApiRequest;
	const res = context.res as NextApiResponse;
	const user = await a006(req);
	if (!user) {
		// 跳转页面进行登录
		a005(req, res);
		return;
	}
	const type = Number(context.params.type);
	return Promise.resolve({
		props: {
			type
		}
	});
};

