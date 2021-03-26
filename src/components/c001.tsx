import { Pagination as BasePagination, Col, Row } from '@geist-ui/react';
import { PaginationProps } from '@geist-ui/react/dist/pagination/pagination';
import { ChevronLeftCircleFill, ChevronRightCircleFill } from '@geist-ui/react-icons';
import router from 'next/router';

export interface Props {
	page: number;
	count: number;
}

/**
 * 统一风格的分页控件
 */
export default function Pagination({ page, count, ...rest }: Props & Omit<PaginationProps, 'initialPage' | 'limit' | 'count' | 'onChange' | 'size'>) {
	return <Row>
		<Col>
			<BasePagination
				limit={10}
				initialPage={page}
				count={count}
				onChange={(vol) => {
					if (vol === page) {
						return;
					}
					const sp = new URLSearchParams(router.query as Record<string, string>);
					sp.set('page', vol.toString());
					const pgname = router.pathname;
					void router.push(`${pgname}?${sp.toString()}`);
				}}
				{...rest}
			>
				<BasePagination.Next>
					<ChevronRightCircleFill />
				</BasePagination.Next>
				<BasePagination.Previous>
					<ChevronLeftCircleFill />
				</BasePagination.Previous>
			</BasePagination>
		</Col>
		<style jsx>{`
Col{
right: 0;
}
`}</style>
	</Row>;
}
