import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Paginator from 'components/Pagination/Pagination';
import { useApp } from 'hooks/useApp';
import { useFilm } from 'hooks/useFilm';
import { FilmFromListModel } from 'types/FilmFromList';
import FilmsAgeSelector from './components/FilmAgeSelector/FilmAgeSelector';
import FilmCountrySelector from './components/FilmCountrySelector/FilmCountrySelector';
import FilmItem from './components/FilmItem/FilmItem';
import FilmItemPlaceholder from './components/FilmItemPlaceholder/FilmItemPlaceholder';

const FilmsList: React.FC = () => {
	const { films, setFilms } = useFilm();
	const { page, filmAge, filmCountry } = useApp();

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const loadFilms = async () => {
		await setFilms(page, filmAge, filmCountry);
	};

	useEffect(() => {
		setIsLoaded(false);
		loadFilms();
	}, [page, filmAge, filmCountry]);

	useEffect(() => {
		setIsLoaded(true);
	}, [films]);

	return (
		<div id='films_list'>
			<span
				className='my-5'
				id='best_films-span'
			>
				Лучшие фильмы и сериалы
			</span>

			<Container className='selectors my-5'>
				<FilmCountrySelector />
				<FilmsAgeSelector />
			</Container>

			<Container className='films_gallery-container'>
				<Row>
					{isLoaded ? (
						<>
							{films?.length > 0 ? (
								<>
									{films?.map((film: FilmFromListModel) => (
										<Col
											key={film.id}
											className='films_gallery-col p-3'
										>
											<FilmItem film={film} />
										</Col>
									))}
									<Paginator />
								</>
							) : (
								<span className='films_gallery-container__no_content-span mb-2'>
									Нет фильмов или сериалов, удовлетворяющих параметрам поиска
								</span>
							)}
						</>
					) : (
						<>
							{Array.from({ length: 2 }).map((_, i) => (
								<Col
									key={i}
									className='films_gallery-col-placeholder p-3'
								>
									<FilmItemPlaceholder />
								</Col>
							))}
						</>
					)}
				</Row>
			</Container>
		</div>
	);
};

export default FilmsList;
