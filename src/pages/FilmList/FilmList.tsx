import cn from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import Paginator from 'components/Pagination/Pagination';
import Slider from 'components/Slider/Slider';
import { useFilmList } from 'hooks/useFilmList';
import { useFilter } from 'hooks/useFilter';
import { usePage } from 'hooks/usePage';
import { CountryType } from 'types/CountryType';
import { FilmFromListModel } from 'types/FilmFromList';
import { Meta } from 'utils/meta';
import FilmItem from './components/FilmItem/FilmItem';
import List from './components/List/List';
import FilmItemPlaceholder from './components/Paceholder/FilmItemPlaceholder';
import styles from './FilmList.module.scss';

const FilmsList: React.FC = () => {
	const { meta, films, setFilms, deleteFilms } = useFilmList();
	const { page, pages, setPage } = usePage();
	const { filmAge, filmCountry, setFilmAge, setFilmCountry } = useFilter();

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

	const onPaginationClick = useCallback(
		(page: number) => () => setPage(page),
		[setPage],
	);

	const loadFilms = async () => {
		await setFilms(page, filmAge, filmCountry);
	};

	useEffect(() => {
		loadFilms();
		return () => {
			deleteFilms();
		};
	}, [page, filmAge, filmCountry]);

	return (
		<div className={styles.film_list}>
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
				/>
				<Button>Найти</Button>
			</Container>

			<Container className={styles.film_list__gallery}>
				<Row>
					{meta === Meta.success ? (
						<>
							{films?.length > 0 ? (
								<>
									<List
										filmList={films}
										increase={false}
									/>
									{/* {films.map((film: FilmFromListModel) => (
										<Col
											key={film.id}
											className={cn(styles['film_list__gallery-col'], 'p-3')}
										>
											<FilmItem film={film} />
										</Col>
									))} */}
									<Paginator
										page={page}
										pages={pages}
										onClick={onPaginationClick}
									/>
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
							{Array.from({ length: 4 }).map((_, i) => (
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
