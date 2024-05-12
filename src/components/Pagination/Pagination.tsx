import cn from 'classnames';
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import styles from './Pagination.module.scss';

type PaginationProps = {
	className?: string;
	page: number;
	pages: number;
	onClick: (page: number) => () => void;
};

const Paginator: React.FC<PaginationProps> = ({
	className,
	page,
	pages,
	onClick,
}) => {
	return (
		<Pagination
			id='pagination'
			className={cn(styles.pagination, !!className && className)}
			data-bs-theme='dark'
		>
			<Pagination.Prev
				disabled={page === 1}
				onClick={onClick(page - 1)}
			/>

			{page > 2 ? (
				<Pagination.Item onClick={onClick(page - 2)}>
					{page - 2}
				</Pagination.Item>
			) : (
				<></>
			)}
			{page > 1 ? (
				<Pagination.Item onClick={onClick(page - 1)}>
					{page - 1}
				</Pagination.Item>
			) : (
				<></>
			)}

			<Pagination.Item active>{page}</Pagination.Item>

			{pages - page > 0 ? (
				<Pagination.Item onClick={onClick(page + 1)}>
					{page + 1}
				</Pagination.Item>
			) : (
				<></>
			)}
			{pages - page > 1 ? (
				<Pagination.Item onClick={onClick(page + 2)}>
					{page + 2}
				</Pagination.Item>
			) : (
				<></>
			)}

			<Pagination.Next
				disabled={page === pages}
				onClick={onClick(page + 1)}
			/>
		</Pagination>
	);
};

export default Paginator;
