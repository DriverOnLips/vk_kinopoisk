import React, { useCallback, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Paginator from 'components/Pagination/Pagination';
import { useFilm } from 'hooks/useFilm';
import { SimilarFilmsType } from 'types/Film';
import styles from './SimilarFilms.module.scss';

const SimilarFilms: React.FC<{
	movies: SimilarFilmsType[];
}> = ({ movies }) => {
	const [page, setPage] = useState<number>(1);
	const navigate = useNavigate();
	const { deleteFilm } = useFilm();

	const onFilmClick = useCallback(
		(movieId: number) => () => {
			deleteFilm();
			navigate(`/film/${movieId}`);
		},
		[deleteFilm, navigate],
	);

	const onPaginationChange = useCallback(
		(page: number) => () => setPage(page),
		[],
	);

	return (
		<Container className={styles.similar_films}>
			<Row className={styles.similar_films__gallery}>
				{movies?.slice(6 * (page - 1), 6 * page).map((movie) => (
					<Col
						key={movie.id}
						sm={2}
						className={styles.similar_films__gallery__item}
						onClick={onFilmClick(movie.id)}
					>
						<Row>
							<Image
								src={movie.photo}
								className={styles['similar_films__gallery__item-img']}
							/>
						</Row>
						<Row>
							<span className={styles['similar_films__gallery__item-span']}>
								{movie.name}
							</span>
						</Row>
					</Col>
				))}
			</Row>
			<Paginator
				page={page}
				pages={Math.ceil(movies?.length / 6)}
				onClick={onPaginationChange}
			/>
		</Container>
	);
};

export default SimilarFilms;
