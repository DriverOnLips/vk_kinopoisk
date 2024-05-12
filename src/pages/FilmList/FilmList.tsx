import cn from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Loader } from 'components/Loader/Loader';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import Paginator from 'components/Pagination/Pagination';
import Slider from 'components/Slider/Slider';
import Text from 'components/Text/Text';
import { useFilmList } from 'hooks/useFilmList';
import { useFilter } from 'hooks/useFilter';
import { usePage } from 'hooks/usePage';
import { CountryType } from 'types/CountryType';
import { Meta } from 'utils/meta';
import List from './components/List/List';
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
			<Text
				className={styles['film_list-span']}
				size='s3'
				text_align='center'
				weight='light'
			>
				Лучшие фильмы и сериалы
			</Text>

			<Container className={styles.film_list__selectors}>
				<Slider
					item={filmAge}
					onSliderChange={onSliderChange}
				/>
				<MultiDropdown
					title='Страна'
					items={filmCountry}
					onClick={onMultidropdownSelect}
				/>
				<Button>Найти</Button>
			</Container>

			<Container className={styles.film_list__gallery}>
				<Row>
					{meta === Meta.success ? (
						<>
							{films?.length > 0 ? (
								<>
									<List filmList={films} />
									<Paginator
										className={styles.film_list__gallery__pagination}
										page={page}
										pages={pages}
										onClick={onPaginationClick}
									/>
								</>
							) : (
								<Text
									className={styles['film_list-span']}
									size='s4'
									text_align='center'
									weight='light'
								>
									Нет фильмов или сериалов, удовлетворяющих параметрам поиска
								</Text>
							)}
						</>
					) : (
						<Loader />
					)}
				</Row>
			</Container>
		</div>
	);
};

export default FilmsList;
