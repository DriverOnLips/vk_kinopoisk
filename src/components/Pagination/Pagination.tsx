import cn from 'classnames';
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useApp } from 'hooks/useApp';
import styles from './Pagination.module.scss';

const Paginator = () => {
	const { page, pages, setPage } = useApp();

	const handlerClick = (num: number) => {
		setPage(num);
	};

	return (
		<Pagination
			id='pagination'
			className={cn(styles.pagination, 'pt-5', 'pb-3')}
			data-bs-theme='dark'
		>
			<Pagination.Prev
				disabled={page === 1}
				onClick={() => handlerClick(page - 1)}
			/>

			{page > 2 ? (
				<Pagination.Item onClick={() => handlerClick(page - 2)}>
					{page - 2}
				</Pagination.Item>
			) : (
				<></>
			)}
			{page > 1 ? (
				<Pagination.Item onClick={() => handlerClick(page - 1)}>
					{page - 1}
				</Pagination.Item>
			) : (
				<></>
			)}

			<Pagination.Item active>{page}</Pagination.Item>

			{pages - page > 0 ? (
				<Pagination.Item onClick={() => handlerClick(page + 1)}>
					{page + 1}
				</Pagination.Item>
			) : (
				<></>
			)}
			{pages - page > 1 ? (
				<Pagination.Item onClick={() => handlerClick(page + 2)}>
					{page + 2}
				</Pagination.Item>
			) : (
				<></>
			)}

			<Pagination.Next
				disabled={page === pages}
				onClick={() => handlerClick(page + 1)}
			/>
		</Pagination>
	);
};

export default Paginator;
