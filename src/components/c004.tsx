import Button from './c002';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { DashboardModal, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useToasts } from '@geist-ui/react';
import { useState } from 'react';

export default function Uploader<T>({ onChange, endpoint, multiple }: {
	onChange(value: T[]): void;
	endpoint: string;
	multiple: true;
}): JSX.Element;
export default function Uploader<T>({ onChange, endpoint, multiple }: {
	onChange(value: T): void;
	endpoint: string;
	multiple: false;
}): JSX.Element;
export default function Uploader<T>({ onChange, endpoint, multiple }: { onChange(value: T[] | T): void; endpoint: string; multiple: boolean; }) {
	const [, toast] = useToasts();
	const [, setfiles] = useState<T[]>([]);
	const [open, setopen] = useState(false);
	const uppy = useUppy(() => {
		const uppy = Uppy({
			allowMultipleUploads: multiple,
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
			const res = result.successful;
			if (res && res.length > 0) {
				toast({
					text: '上传成功',
					type: 'success'
				});
				const newfiles = res.map((s) => {
					return s.response.body as T;
				});
				setfiles((files) => {
					return [...files, ...newfiles];
				});
				// setopen(false);
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
			setfiles((files) => {
				setTimeout(() => {
					if (multiple) {
						onChange(files);
					} else {
						const [file] = files;
						onChange(file);
					}
				}, 0);
				return [];
			});
		}} />
	</>;
}
