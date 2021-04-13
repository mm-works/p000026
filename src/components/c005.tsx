import { Col, Row } from '@geist-ui/react';

const s002 = '/api/s002';

export default function c005() {
	return <>
		<Row>
			<Col span={12}>
				<a href='/'>建材首页</a>
			</Col>
			<Col span={8}>
				<a href='/pg009'>资讯发布</a>
			</Col>
			<Col span={4}>
				<a href={s002}>退出登录</a>
			</Col>
		</Row>
	</>;
}
