import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useFilm } from '../../hooks/useFilm';
import FilmPagePlaceholder from './components/Placeholder/FilmPagePlaceholder';
import Reviews from './components/Reviews/Reviews';
import SimilarFilms from './components/SimilarFilms/SimilarFilms';

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
											{film?.genre}
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
											Рейтинг: {Math.round(film!.rating * 100) / 100}
										</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
					<Row className='film__reviews'>
						<span className='film__reviews-span mb-2'>Отзывы:</span>
						{film!.reviews!.length > 0 ? (
							<Reviews reviews={film!.reviews} />
						) : (
							<span className='film__reviews__no_reviews-span mb-2'>
								Отзывов пока нет
							</span>
						)}
					</Row>
					<Row className='film__similar my-3'>
						<span className='film__similar-span mb-2'>
							Вам может понравиться:
						</span>
						{film!.similarFilms.length > 0 ? (
							<SimilarFilms movies={film!.similarFilms} />
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
