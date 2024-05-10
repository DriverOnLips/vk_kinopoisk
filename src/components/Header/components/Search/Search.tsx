import cn from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { Dropdown, Form, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApp } from 'hooks/useApp';
import useDebounce from 'hooks/useDebounce';
import { useFilm } from 'hooks/useFilm';
import { FilmFromSearchModel } from 'types/FilmFromSearch';
import SearchItem from '../SearchItem/SearchItem';
import styles from './Search.module.scss';

const Search: React.FC<{ buttonRef: React.RefObject<HTMLDivElement> }> = ({
	buttonRef,
}) => {
	const { isSearchOpen, setIsSearchOpen } = useApp();
	const {
		filmsFromSearch,
		setFilmsFromSearch,
		deleteFilmsFromSearch,
		filmsSearchHistory,
		addFilmToHistory,
	} = useFilm();
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearchText = useDebounce(searchText, 1000);
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLFormElement>(null);
	const { deleteFilm } = useFilm();
	const [filmsToSuggest, setFilmsToSuggest] = useState<FilmFromSearchModel[]>(
		[],
	);

	const loadFilms = async (name: string) => {
		if (!name) return;
		await setFilmsFromSearch(name);
	};

	const handlerOnChangeInput = (e: any) => {
		setSearchText(e.target.value);

		const query = e.target.value.trim();

		if (query.length > 0) {
			setFilmsToSuggest(
				filmsSearchHistory.filter((film: FilmFromSearchModel) =>
					film.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
				),
			);
		} else {
			setFilmsToSuggest([]);
		}
	};

	const handlerOnClickDropdown = (film: FilmFromSearchModel) => {
		setIsSearchOpen(false);
		setSearchText('');
		buttonRef.current?.getElementsByTagName('button')[0].click();
		if (location.pathname !== `/film/${film.id}`) {
			addFilmToHistory(film);
			deleteFilm();
			navigate(`/film/${film.id}`);
		}
	};

	useEffect(() => {
		if (searchText.length === 0) {
			deleteFilmsFromSearch();
		}
	}, [searchText]);

	useEffect(() => {
		if (debouncedSearchText) {
			loadFilms(debouncedSearchText.trim());
		}
	}, [debouncedSearchText]);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsSearchOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<Form
			className={cn(styles.header_searh, 'd-flex', 'flex-grow-1', 'px-3')}
			ref={dropdownRef}
		>
			{(filmsFromSearch.length > 0 ||
				(isSearchOpen && filmsSearchHistory?.length > 0)) && (
				<Dropdown.Menu
					show={isSearchOpen}
					className={styles.header_searh__dropdown}
				>
					{filmsToSuggest?.length > 0 && (
						<>
							<Dropdown.ItemText>Ранее Вы искали:</Dropdown.ItemText>
							{filmsToSuggest.map((film: FilmFromSearchModel) => (
								<SearchItem
									key={film.id}
									film={film}
									handlerOnClickDropdown={handlerOnClickDropdown}
								/>
							))}
							<Dropdown.Divider />
						</>
					)}
					{filmsFromSearch.length === 0 && searchText.length > 0 && (
						<Placeholder
							as='p'
							animation='glow'
							style={{ margin: '1rem' }}
						>
							<Placeholder xs={4} /> <Placeholder xs={6} />
							<Placeholder xs={8} /> <Placeholder xs={6} />
							<Placeholder xs={6} />{' '}
						</Placeholder>
					)}
					{filmsFromSearch.length > 0 &&
						filmsFromSearch.map((film: FilmFromSearchModel) => (
							<SearchItem
								key={film.id}
								film={film}
								handlerOnClickDropdown={handlerOnClickDropdown}
							/>
						))}
					{filmsSearchHistory?.length > 0 && (
						<>
							<Dropdown.Divider />
							<Dropdown.ItemText>История:</Dropdown.ItemText>
							{filmsSearchHistory.map((film: FilmFromSearchModel) => (
								<SearchItem
									key={film.id}
									film={film}
									handlerOnClickDropdown={handlerOnClickDropdown}
								/>
							))}
						</>
					)}
				</Dropdown.Menu>
			)}
			<Form.Control
				type='search'
				placeholder='Фильмы, сериалы'
				className='me-2'
				aria-label='Search'
				value={searchText}
				onChange={(e) => handlerOnChangeInput(e)}
				onFocus={() => setIsSearchOpen(true)}
			/>
		</Form>
	);
};

export default Search;
