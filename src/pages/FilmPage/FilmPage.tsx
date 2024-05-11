import React, { useEffect, useState } from 'react';
import './FilmPage.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useFilm } from '../../hooks/useFilm';
import Actors from './components/Actors/Actors';
import FilmPagePlaceholder from './components/FilmPagePlaceholder/FilmPagePlaceholder';
import PostersCarousel from './components/Posters/Posters';
import Reviews from './components/Reviews/Reviews';
import Series from './components/Seasons/Seasons';
import SimilarMovies from './components/SimilarMovies/SimilarMovies';

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
		}
	}, [film]);

	return (
		<div id='film_page'>
			<svg
				className='arrow-back'
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
				<Container className='film_info'>
					<Row>
						<Col
							sm={5}
							className='film_info__photo'
						>
							<img
								src={film?.photo}
								className='film_info__photo-img'
							/>
						</Col>
						<Col
							sm={7}
							className='film_info-div'
						>
							<div className='film_info__about'>
								<span className='film_info__about__name'>{film?.name}</span>

								<Row className='film_info__about__country_genres mb-4'>
									<Col
										sm={6}
										className='film_info__about__country-div'
										style={{ padding: '0' }}
									>
										<span className='film_info__about__country'>
											{film?.country}, {film?.year}
										</span>
									</Col>
									<Col
										sm={6}
										className='film_info__about__genres-div'
										style={{ padding: '0' }}
									>
										<span className='film_info__about__genres'>
											{film?.genres.charAt(0).toLocaleUpperCase() +
												film?.genres.slice(1)}
										</span>
									</Col>
								</Row>

								<Row className='mb-4'>
									<Col>
										<span className='film_info__about__description-span'>
											{film?.description}
										</span>
									</Col>
								</Row>
								<Row className='film_info__about__rating_series mb-4'>
									<Col
										sm={6}
										style={{ padding: '0' }}
									>
										<span className='film_info__about__rating'>
											Рейтинг: {Math.round(film?.rating * 100) / 100}
										</span>
									</Col>
								</Row>
							</div>
							<Row className='posters-main my-5'>
								<Col className='film_info__posters'>
									<span className='film_info__posters-span'>Постеры:</span>
									{film?.posters?.length > 0 ? (
										<PostersCarousel posters={film.posters} />
									) : (
										<span className='film_info__no_posters-span mb-2'>
											Отсутствуют
										</span>
									)}
								</Col>
							</Row>
						</Col>
						<Row className='posters-mobile'>
							<Col className='posters-mobile-div'>
								<span className='posters-mobile-span'>Постеры:</span>
								{film?.posters?.length > 0 ? (
									<PostersCarousel posters={film.posters} />
								) : (
									<span className='film_info__no_posters-mobile-span mb-2'>
										Отсутствуют
									</span>
								)}
							</Col>
						</Row>
					</Row>
					<Row className='my-3 film__actors'>
						<span className='film__actors-span mb-2'>Актеры:</span>
						{film?.actors?.length > 0 ? (
							<Actors actors={film?.actors} />
						) : (
							<span className='film__actors__no_actors-span mb-2'>
								Актерский состав не известен
							</span>
						)}
					</Row>
					<Row className='film__reviews'>
						<span className='film__reviews-span mb-2'>Отзывы:</span>
						{film?.reviews?.length > 0 ? (
							<Reviews reviews={film?.reviews} />
						) : (
							<span className='film__reviews__no_reviews-span mb-2'>
								Отзывов пока нет
							</span>
						)}
					</Row>
					<Row className='film__series my-3'>
						<span className='film__series-span mb-2'>Сезоны:</span>
						{film?.isSeries ? (
							<Series seasons={film.seasons} />
						) : (
							<span className='film__series__no_series-span mb-2'>
								Фильм не имеет сезонов
							</span>
						)}
					</Row>
					<Row className='film__similar my-3'>
						<span className='film__similar-span mb-2'>
							Вам может понравиться:
						</span>
						{film?.similarMovies?.length > 0 ? (
							<SimilarMovies movies={film?.similarMovies} />
						) : (
							<span className='film__similar__no_similar-span mb-2'>
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
