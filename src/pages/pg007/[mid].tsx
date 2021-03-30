import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import an49 from '@mmstudio/an000049';
import { Col, Row, Spacer, useToasts } from '@geist-ui/react';
import Button from '../../components/c002';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCoverflow, Keyboard } from 'swiper/core';
import 'swiper/swiper.min.css';
import getfileuri from '../../atoms/a001';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DashboardModal, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import { Result as R1 } from '../api/pg007/s001/[mid]';
import { Result as R2 } from '../api/pg007/s002/[id]';

const s002 = '/api/pg007/s002';
const s001 = '/api/pg007/s001';
SwiperCore.use([Autoplay, Keyboard, EffectCoverflow]);

interface IProps {
	data: ITbpictures[];
	mid: string;
}

/**
 * 轮播图片
 */
const page: NextPage<IProps> = ({ data, mid }) => {
	const [imgs, setimgs] = useState(data);
	return <>
		<Head>
			<title>轮播图片</title>
		</Head>
		<Spacer y={6} />
		<C002 mid={mid} onUploadedFiles={(files) => {
			setimgs(imgs.concat(files.map((file) => {
				return {
					id: file.id,
					mid,
					src: file.fid
				}
			})));
		}}></C002>
		<Spacer y={3} />
		<C001 data={imgs.map((it) => {
			return getfileuri(it.src);
		})}></C001>
		<Spacer y={3} />
		<C003 data={imgs} ></C003>
	</>;
};

export const config: PageConfig = {
	amp: false
};

export default page;

export const getServerSideProps: GetServerSideProps<IProps, { mid: string; }> = async (context) => {
	const mid = context.params.mid;
	const db = an49();
	const dt = db<ITbpictures>('pictures');
	const data = await dt.select('*').where({
		mid
	});
	return {
		props: {
			data,
			mid
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
function C002({ onUploadedFiles, mid }: { onUploadedFiles(files: R1[]): void; mid: string; }) {
	const endpoint = `${s001}/${mid}`;
	const [uploadedfiles, setuploadedfiles] = useState<R1[]>([]);
	const [, toast] = useToasts();
	const [open, setopen] = useState(false);
	const uppy = useUppy(() => {
		const uppy = Uppy({
			allowMultipleUploads: true,
			autoProceed: true,
			debug: true,
			restrictions: {
				maxFileSize: 1000000,
				maxNumberOfFiles: 10,
				minNumberOfFiles: 1,
				allowedFileTypes: ['image/*', 'video/*']
			}
		});
		uppy.use(XHRUpload, {
			fieldName: 'file',
			formData: true,
			method: 'PUT',
			endpoint
		});
		uppy.on('complete', (result) => {
			// 以下代码可将上传的内容变成下载链接,放在页面上.
			const [success] = result.successful;
			if (success) {
				toast({ text: '上传成功' });
				const content = success.response.body as R1;
				uploadedfiles.push(content);
				setuploadedfiles(uploadedfiles);
			}
		});
		return uppy;
	});
	return <>
		<Button onClick={() => {
			setopen(true);
		}} >上传</Button>
		<DashboardModal uppy={uppy} open={open} onRequestClose={() => {
			setopen(false);
			onUploadedFiles(uploadedfiles);
			setuploadedfiles([]);
		}} />
	</>
}

function C003({ data }: { data: ITbpictures[]; }) {
	const [, toast] = useToasts();
	return <ol>
		{data.map((it, key) => {
			const src = getfileuri(it.src);
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
	</ol>;
}
