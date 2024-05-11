import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Gallery from 'components/Gallery/Gallery';
import { useFilm } from '../../hooks/useFilm';
import FilmPagePlaceholder from './components/Placeholder/FilmPagePlaceholder';
import ReviewItem from './components/ReviewItem/ReviewItem';
import SimilarFilms from './components/SimilarFilms/SimilarFilms';

import styles from './FilmPage.module.scss';

const FilmPage: React.FC = () => {
	const { id } = useParams();
	const { film, setFilm } = useFilm();
	const navigate = useNavigate();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const loadFilm = async () => {
		if (id) {
			await setFilm(+id);
		}
	};

	useEffect(() => {
		setIsLoaded(false);
		loadFilm();
	}, [id]);

	useEffect(() => {
		if (film?.id) {
			setIsLoaded(true);
		} else {
			return;
		}
	}, [film]);

	return (
		<div className={styles.film_page}>
			<svg
				className={styles.film_page__arrow_back}
				width='36'
				height='34'
				viewBox='0 0 360 336'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				onClick={() => navigate('/')}
			>
				<path
					d='M168 312L24 168L168 24M44 168H336'
					stroke='#0D6EFD'
					strokeWidth='48'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
			{isLoaded ? (
				<Container className={styles.film_page__film_info}>
					<Row>
						<Col
							sm={5}
							className={styles.film_page__film_info__photo}
						>
							<img
								src={film?.photo}
								className={styles['film_page__film_info__photo-img']}
							/>
						</Col>
						<Col
							sm={7}
							className={styles['film_page__film_info-div']}
						>
							<div className={styles['film_page__film_info-div__about']}>
								<span
									className={styles['film_page__film_info-div__about__name']}
								>
									{film?.name}
								</span>

								<Row
									className={cn(
										styles['film_page__film_info-div__about__country_genres'],
										'mb-4',
									)}
								>
									<Col
										sm={6}
										className={
											styles['film_page__film_info-div__about__country-div']
										}
										style={{ padding: '0' }}
									>
										<span
											className={
												styles['film_page__film_info-div__about__country']
											}
										>
											{film?.country}, {film?.year}
										</span>
									</Col>
									<Col
										sm={6}
										className={
											styles['film_page__film_info-div__about__genres-div']
										}
										style={{ padding: '0' }}
									>
										<span
											className={
												styles['film_page__film_info-div__about__genres']
											}
										>
											{film?.genre}
										</span>
									</Col>
								</Row>

								<Row className='mb-4'>
									<Col>
										<span
											className={
												styles['film_page__film_info-div__about__description']
											}
										>
											{film?.description}
										</span>
									</Col>
								</Row>
								<Row
									className={cn(
										styles['film_page__film_info-div__about__rating_series'],
										'mb-4',
									)}
								>
									<Col
										sm={6}
										style={{ padding: '0' }}
									>
										<span
											className={
												styles['film_page__film_info-div__about__rating']
											}
										>
											Рейтинг: {Math.round(film!.rating * 100) / 100}
										</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
					<Row className={styles.film_page__film_info__reviews}>
						<span
							className={cn(
								styles['film_page__film_info__reviews-span'],
								'mb-2',
							)}
						>
							Отзывы:
						</span>
						{film!.reviews?.length > 0 ? (
							film?.reviews && (
								<Gallery
									items={film.reviews}
									ItemElement={ReviewItem}
								/>
							)
						) : (
							<span
								className={cn(
									styles['film_page__film_info__reviews__no_reviews-span'],
									'mb-2',
								)}
							>
								Отзывов пока нет
							</span>
						)}
					</Row>
					<Row className={cn(styles.film_page__film_info__similar, 'my-3')}>
						<span
							className={cn(
								styles['film_page__film_info__similar-span'],
								'mb-2',
							)}
						>
							Вам может понравиться:
						</span>
						{film!.similarFilms?.length > 0 ? (
							<SimilarFilms movies={film!.similarFilms} />
						) : (
							<span
								className={cn(
									styles['film_page__film_info__similar__no_similar-span'],
									'mb-2',
								)}
							>
								Похожих фильмов не нашлось
							</span>
						)}
					</Row>
				</Container>
			) : (
				<FilmPagePlaceholder />
			)}
		</div>
	);
};

export default FilmPage;
