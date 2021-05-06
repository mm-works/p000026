import Link from 'next/link';

const s002 = '/api/s002';

export default function c005() {
	return <>
		<div className='cls001'>
			<MenuItem href='/' title='建材首页' prefetch />
			<MenuItem href='/pg008' title='首页轮播图' prefetch />
			<MenuItem href='/pg009' title='资讯发布' prefetch />
			<a className='cls002' href={s002}>退出登录</a>
		</div>
		<style jsx>{`
.cls002{
	font-size:1.5rem;
}
.cls001{
display: flex;
justify-content: flex-end;
padding-top: 1rem;
padding-bottom: 1rem;
margin-right: 5rem;
}
`}</style>
	</>;
}

function MenuItem({ href, title, prefetch }: { href: string; title: string; prefetch: boolean; }) {
	return <>
		<Link href={href} prefetch={prefetch}>
			<a className='cls001'>{title}</a>
		</Link>
		<style jsx>{`
.cls001{
	font-size: 2rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
	padding-left: 2rem;
	padding-right: 2rem;
	color: burlywood;
	transition: all 800ms;
}
.cls001:hover{
	color: white;
	background-color: yellowgreen;
}
`}</style>
	</>;
}
