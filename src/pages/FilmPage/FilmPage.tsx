import cn from 'classnames';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Gallery from 'components/Gallery/Gallery';
import { useFilmPage } from 'hooks/useFilmPage';
import { Meta } from 'utils/meta';
import FilmPagePlaceholder from './components/Placeholder/FilmPagePlaceholder';
import ReviewItem from './components/ReviewItem/ReviewItem';
import SimilarFilms from './components/SimilarFilms/SimilarFilms';

import styles from './FilmPage.module.scss';

const FilmPage: React.FC = () => {
	const { id } = useParams();
	const { meta, film, setFilm, deleteFilm } = useFilmPage();
	const navigate = useNavigate();

	const loadFilm = async () => {
		if (id) {
			await setFilm(+id);
		}
	};

	useEffect(() => {
		loadFilm();
		document.body.style.background = 'none';

		return () => {
			deleteFilm();
			document.body.style.background = '';
		};
	}, [id]);

	return (
		<div className={styles.film_page}>
			<svg
				className={styles.film_page__arrow_back}
				width='36'
				height='34'
				viewBox='0 0 360 336'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				onClick={() => navigate(-1)}
			>
				<path
					d='M168 312L24 168L168 24M44 168H336'
					stroke='#0D6EFD'
					strokeWidth='48'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
			{meta === Meta.success ? (
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
						{film!.reviews?.length > 0 && (
							<>
								<span
									className={cn(
										styles['film_page__film_info__reviews-span'],
										'mb-2',
									)}
								>
									Отзывы:
								</span>
								<Gallery
									items={film!.reviews}
									ItemElement={ReviewItem}
								/>
							</>
						)}
					</Row>
					<Row className={cn(styles.film_page__film_info__similar, 'my-3')}>
						{film!.similarFilms?.length > 0 && (
							<>
								<span
									className={cn(
										styles['film_page__film_info__similar-span'],
										'mb-2',
									)}
								>
									Вам может понравиться:
								</span>
								<SimilarFilms movies={film!.similarFilms} />
							</>
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
