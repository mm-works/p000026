import { NextPage, PageConfig } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { ReactNode, useState } from 'react';
import { Col, Input, Row, Spacer, useToasts } from '@geist-ui/react';
import Button from '../components/c002';
import { Message as M1, Result as R1 } from './api/pg003/s001';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DashboardModal, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Message as M2, Query as Q2, Result as R2 } from './api/pg003/s002';
import getfileuri from '../atoms/a001';

const s002 = '/api/pg003/s002';
const s001 = '/api/pg003/s001';
interface IProps {
}

/**
 * 新增建材类型
 */
const page: NextPage<IProps> = () => {
	const [name, setname] = useState('');
	const [cover, setcover] = useState('');
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
			<C002 onChange={(id) => {
				setcover(id);
			}}></C002>
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
						sort,
						cover
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

/**
 * 封面
 */
function C002({ onChange }: { onChange(value: string): void }) {
	const endpoint = `${s002}`;
	const [, toast] = useToasts();
	const [open, setopen] = useState(false);
	const [cover, setcover] = useState('');
	const uppy = useUppy(() => {
		const uppy = Uppy({
			allowMultipleUploads: false,
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
				const content = success.response.body as R2;
				if (content.ok === true) {
					toast({
						text: '上传成功',
						type: 'success'
					});
					setopen(false);
					setcover(content.id)
					onChange(content.id);
				} else {
					toast({
						text: content.message,
						type: 'error'
					});
				}
			}
		});
		return uppy;
	});
	return <C001>
		{cover && <img src={getfileuri(cover)} />}
		<Button onClick={() => {
			setopen(true);
		}} >上传</Button>
		<DashboardModal uppy={uppy} open={open} onRequestClose={() => {
			setopen(false);
		}} />
	</C001>;
}
