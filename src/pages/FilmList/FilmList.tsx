import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import MultiDropdown from 'components/MultiDropdown/MultiDropdown';
import Paginator from 'components/Pagination/Pagination';
import Text from 'components/Text/Text';
import { useFilmList } from 'hooks/useFilmList';
import { useFilter } from 'hooks/useFilter';
import { usePage } from 'hooks/usePage';
import { useQueryParams } from 'hooks/useQueryParams';
import { AgeType } from 'types/AgeType';
import { CountryType } from 'types/CountryType';
import { Meta } from 'utils/meta';
import List from './components/List/List';
import styles from './FilmList.module.scss';

const FilmsList: React.FC = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const { meta, films, setFilms, deleteFilms } = useFilmList();
	const { page, pages, setPage } = usePage();
	const { filmAge, filmCountry, setFilmAge, setFilmCountry } = useFilter();
	const { params, getParam } = useQueryParams();

	const navigate = useNavigate();
	const location = useLocation();

	const setSearch = useCallback(
		(param: string, value: number | string) => {
			const newSearchParams = new URLSearchParams(location.search);
			if (param === 'age' || param === 'country') {
				newSearchParams.set(param, String(value));
				newSearchParams.set('page', '1');
				navigate(`?${newSearchParams.toString()}`, { replace: true });

				return;
			}

			newSearchParams.set(param, String(value));
			navigate(`?${newSearchParams.toString()}`, { replace: true });
		},
		[location.search, navigate],
	);

	const onCountrySelect = useCallback(
		(e: React.MouseEvent<HTMLDivElement>, country: CountryType) => {
			e.preventDefault();

			setSearch('country', country.name);
		},
		[setSearch],
	);

	const onAgeSelect = useCallback(
		(e: React.MouseEvent<HTMLDivElement>, age: AgeType) => {
			e.preventDefault();

			setSearch('age', age.age);
		},
		[setSearch],
	);

	const onPaginationClick = useCallback(
		(page: number) => () => {
			setSearch('page', page);
		},
		[setSearch],
	);

	const loadFilms = async () => {
		await setFilms(page, filmAge, filmCountry);
	};

	useEffect(() => {
		loaded && loadFilms();

		return () => {
			deleteFilms();
		};
	}, [page, filmAge, filmCountry, loaded]);

	useEffect(() => {
		const loadedFromUrl = getParam('loaded');
		if (loadedFromUrl) {
			setLoaded(true);
		} else {
			setSearch('loaded', 'true');
		}

		const pageFromUrl = getParam('page');
		pageFromUrl && setPage(+pageFromUrl);

		const ageFromUrl = getParam('age');
		ageFromUrl && setFilmAge(+ageFromUrl);

		const countryFromUrl = getParam('country');
		if (countryFromUrl && typeof countryFromUrl === 'string') {
			setFilmCountry(countryFromUrl);
		}
	}, [params]);

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
				<MultiDropdown
					title='Возрастное ограничение'
					items={filmAge}
					onClick={onAgeSelect}
				/>
				<MultiDropdown
					title='Страна'
					items={filmCountry}
					onClick={onCountrySelect}
				/>
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
