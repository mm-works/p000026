import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import an49 from '@mmstudio/an000049';
import { Col, Row, Spacer, useToasts } from '@geist-ui/react';
import Button from '../components/c002';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCoverflow, Keyboard } from 'swiper/core';
import 'swiper/swiper.min.css';
import getfileuri from '../atoms/a001';
import { Result as R1 } from './api/pg008/s001';
import { Result as R2 } from './api/pg008/s002/[id]';
import Uploader from '../components/c004';
import a006 from '../atoms/a006';
import a005 from '../atoms/a005';

const s002 = '/api/pg008/s002';
const s001 = '/api/pg008/s001';
SwiperCore.use([Autoplay, Keyboard, EffectCoverflow]);

interface IProps {
	data: ITbswiper[];
}

/**
 * 首页轮播图
 */
const page: NextPage<IProps> = ({ data }) => {
	const [imgs, setimgs] = useState(data);
	return <>
		<Head>
			<title>首页轮播图</title>
		</Head>
		<div className='cls001'>
			<Row justify='center'>
				<Col span={12}>
					<C001 data={imgs.map((it) => {
						return getfileuri(it.id);
					})}></C001>
					<C002 />
				</Col>
				<Col span={12}>
					<C003 data={imgs} ></C003>
				</Col>
			</Row>
		</div>
		<style jsx>{`
.cls001{
margin: 5rem;
}
`}</style>
	</>;
};

export const config: PageConfig = {
	amp: false
};

export default page;

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const req = context.req as NextApiRequest;
	const res = context.res as NextApiResponse;
	const user = await a006(req);
	if (!user) {
		// 跳转页面进行登录
		a005(req, res);
		return;
	}
	const db = an49();
	const dt = db<ITbswiper>('swiper');
	const data = await dt.select('*');
	return {
		props: {
			data
		}
	};
};

/**
 * 轮播
 */
function C001({ data }: { data: string[] }) {
	return <>
		<Swiper
			spaceBetween={50}
			slidesPerView={1}
			autoplay
			keyboard
			loop
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			{data.map((it, idx) => {
				return <SwiperSlide key={idx}>
					<img height='400px' src={it}></img>
				</SwiperSlide>
			})}
		</Swiper>
	</>;;
}

/**
 * 上传按钮
 */
function C002() {
	return <>
		<div>
			<Uploader multiple={true} endpoint={s001} onChange={(v: R1[]) => {
				window.location.reload();
			}} />
		</div>
		<style jsx>{`
div{
text-align: center;
}
`}</style>
	</>
}

/**
 * 操作列表
 */
function C003({ data }: { data: ITbswiper[]; }) {
	const [, toast] = useToasts();
	return <ol>
		{data.map((it, key) => {
			const src = getfileuri(it.id);
			const id = it.id;
			return <li key={key}>
				<Row>
					<Col span={12}>
						<img height='50px' src={src} />
					</Col>
					<Col span={12}>
						<Button type='error' onClick={async () => {
							const url = `${s002}/${id}`;
							const ret = await fetch(url, {
								method: 'DELETE'
							});
							const res = await ret.json() as R2;
							if (res.ok === true) {
								toast({
									text: '删除成功',
									type: 'success'
								});
								window.location.reload();
							} else {
								toast({
									text: res.message,
									type: 'error'
								});
							}
						}}>删除</Button>
					</Col>
				</Row>
			</li>;
		})}
		<style jsx>{`
ol{
margin-left: 5rem;
}
`}</style>
	</ol>;
}
