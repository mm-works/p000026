import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IProps {
}

/**
 * 301
 */
const page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>301</title>
			</Head>
			<C001></C001>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

function C001() {
	return <>
		无法登录,<Link href='/pg013'>重试</Link>
	</>;
}
