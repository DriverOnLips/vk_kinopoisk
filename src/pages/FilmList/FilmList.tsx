import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import Paginator from 'components/Pagination/Pagination';
import Slider from 'components/Slider/Slider';
import { useApp } from 'hooks/useApp';
import { useFilm } from 'hooks/useFilm';
import { CountryType } from 'types/CountryType';
import { FilmFromListModel } from 'types/FilmFromList';
import FilmItem from './components/FilmItem/FilmItem';
import FilmItemPlaceholder from './components/Paceholder/FilmItemPlaceholder';
import styles from './FilmList.module.scss';

const FilmsList: React.FC = () => {
	const { films, setFilms } = useFilm();
	const { page, filmAge, filmCountry, setFilmCountry, setFilmAge } = useApp();

	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const onMultidropdownSelect = useCallback(
		(e: React.MouseEvent<HTMLDivElement>, country: CountryType) => {
			e.preventDefault();

			const updatedCountries = filmCountry.map((ctr: CountryType) => {
				return {
					...ctr,
					state:
						ctr.state === true
							? false
							: ctr.name === country.name
								? true
								: ctr.state,
				};
			});

			setFilmCountry(updatedCountries);
		},
		[filmCountry, setFilmCountry],
	);

	const onSliderChange = useCallback(
		(newAge: number) => {
			if (newAge !== filmAge) {
				setFilmAge(newAge);
			}
		},
		[filmAge, setFilmAge],
	);

	const onSliderButtonClick = useCallback(() => {
		setFilms(page, filmAge, filmCountry);
	}, [page, filmAge, filmCountry]);

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
		<div id={styles.film_list}>
			<span className={cn(styles['film_list_span'], 'my-5')}>
				Лучшие фильмы и сериалы
			</span>

			<Container className={styles.film_list__selectors}>
				<MultiDropdown
					title='Страна'
					items={filmCountry}
					onClick={onMultidropdownSelect}
				/>
				<Slider
					item={filmAge}
					onSliderChange={onSliderChange}
					onButtonClick={onSliderButtonClick}
				/>
				<Button>Найти</Button>
			</Container>

			<Container className={styles.film_list__gallery}>
				<Row>
					{isLoaded ? (
						<>
							{films?.length > 0 ? (
								<>
									{films?.map((film: FilmFromListModel) => (
										<Col
											key={film.id}
											className={cn(styles['film_list__gallery-col'], 'p-3')}
										>
											<FilmItem film={film} />
										</Col>
									))}
									<Paginator />
								</>
							) : (
								<span
									className={cn(
										styles['film_list__gallery__no_content-span'],
										'mb-2',
									)}
								>
									Нет фильмов или сериалов, удовлетворяющих параметрам поиска
								</span>
							)}
						</>
					) : (
						<>
							{Array.from({ length: 2 }).map((_, i) => (
								<Col
									key={i}
									className={cn(
										styles['film_list__gallery-col_placeholder'],
										'p-3',
									)}
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
