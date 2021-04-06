import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import an49 from '@mmstudio/an000049';
import { Col, Input, Row, Spacer, Text, useToasts } from '@geist-ui/react';
import router from 'next/router';
import Button from '../../components/c002';
import RichEditor from '../../components/c003';
import { Message as M1, Result as R1 } from '../api/pg006/s001';
import Uploader from '../../components/c004';
import getfileuri from '../../atoms/a001';
import { Message as M2, Query as Q2, Result as R2 } from '../api/pg006/s002';

const s002 = '/api/pg006/s002';
const s001 = '/api/pg006/s001';
interface IProps {
	data: ITbmaterial;
}

/**
 * 建材编辑
 */
const page: NextPage<IProps> = ({ data }) => {
	const id = data.id;
	const type = data.type;
	const [price, setprice] = useState(data.price);
	const [name, setname] = useState(data.name);
	const [color, setcolor] = useState(data.color);
	const [specifications, setspecifications] = useState(data.specifications);
	const [description, setdescription] = useState(data.description);
	const [no, setno] = useState(data.no);
	const [state, setstate] = useState(data.state);
	const [tmup, settmup] = useState(data.tmup);
	const [tmdown, settmdown] = useState(data.tmdown);
	const [sort, setsort] = useState(data.sort);
	const [cover, setcover] = useState(data.cover);
	const [, toast] = useToasts();
	return <>
		<Head>
			<title>建材类型编辑</title>
		</Head>
		<Spacer y={6} />
		<C001><Input value={name} onChange={(e) => {
			setname(e.target.value);
		}}>名称</Input></C001>
		<C001><Input value={color} onChange={(e) => {
			setcolor(e.target.value);
		}}>颜色</Input></C001>
		<C001><C002 value={cover} onChange={(v) => {
			setcover(v);
		}}></C002></C001>
		<C001><Input value={`${price}`} type='number' onChange={(e) => {
			setprice(Number(e.target.value));
		}}>价格</Input></C001>
		<C001><Input value={specifications} onChange={(e) => {
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
		<C001><Input value={`${tmup}`} type='date' onChange={(e) => {
			settmup(new Date(e.target.value).getTime());
		}}>上架时间</Input></C001>
		<C001><Input value={`${tmdown}`} type='date' onChange={(e) => {
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
					id,
					name,
					cover,
					type,
					price,
					sort,
					color,
					description,
					no,
					specifications,
					state,
					tmdown,
					tmup,
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
	</>;
};

export const config: PageConfig = {
	amp: false
};

export default page;

export const getServerSideProps: GetServerSideProps<IProps, { id: string; }> = async (context) => {
	const id = context.params.id;
	const db = an49();
	const dt = db<ITbmaterial>('material');
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

function C002({ value, onChange }: { value: string; onChange(v: string): unknown; }) {
	const [img, setimg] = useState(value);
	return <>
		<Text>封面图片</Text>
		{img && <img src={getfileuri(img)} />}
		<Uploader multiple={false} endpoint={s002} onChange={(e: R2) => {
			setimg(e.id)
			onChange(e.id);
		}}></Uploader>
	</>;
}
