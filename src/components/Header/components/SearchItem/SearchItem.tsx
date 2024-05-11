import React, { memo, useCallback } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { FilmFromSearchModel } from 'types/FilmFromSearch';
import styles from './SearchItem.module.scss';

type SearchItemProps = {
	film: FilmFromSearchModel;
	onDropdownClick: (film: FilmFromSearchModel) => void;
};

const SearchItem: React.FC<SearchItemProps> = ({ film, onDropdownClick }) => {
	const onClick = useCallback(
		(event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			onDropdownClick(film);
		},
		[film, onDropdownClick],
	);

	return (
		<Dropdown.Item
			key={film.id}
			onClick={onClick}
			className='my-2'
		>
			<Row className={styles.search_item}>
				<Col
					xs={3}
					className={styles.search_item__photo}
				>
					<img
						src={film.photo}
						alt={film.name}
						className={styles['search_item__photo-img']}
					/>
				</Col>
				<Col
					xs={9}
					className={styles.search_item__info}
				>
					<Row className={styles.search_item__info__name}>{film.name}</Row>
					<Row className={styles.search_item__info__country_year}>
						<span className={styles.search_item__info__country}>
							{film.year}, {film.country}
						</span>
						<span className={styles.search_item__info__year}>{film.genre}</span>
					</Row>
				</Col>
			</Row>
		</Dropdown.Item>
	);
};

export default memo(SearchItem);
