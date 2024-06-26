import cn from 'classnames';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dropdown, Form, Placeholder } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import { useFilmSearch } from 'hooks/useFilmSearch';
import { FilmFromSearchModel } from 'types/FilmFromSearch';
import { Meta } from 'utils/meta';
import SearchItem from '../SearchItem/SearchItem';
import styles from './Search.module.scss';

const Search: React.FC<{ buttonRef: React.RefObject<HTMLDivElement> }> = ({
	buttonRef,
}) => {
	const {
		filmsFromSearch,
		filmsSearchHistory,
		isSearchOpen,
		meta,
		setFilmsFromSearch,
		deleteFilmsFromSearch,
		addFilmToHistory,
		setIsSearchOpen,
	} = useFilmSearch();
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearchText = useDebounce(searchText, 1000);
	const navigate = useNavigate();
	const dropdownRef = useRef<HTMLFormElement>(null);
	const [filmsToSuggest, setFilmsToSuggest] = useState<FilmFromSearchModel[]>(
		[],
	);

	const loadFilms = useCallback(
		async (name: string) => {
			if (!name) return;
			await setFilmsFromSearch(name);
		},
		[setFilmsFromSearch],
	);

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
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
		},
		[filmsSearchHistory],
	);

	const onDropdownClick = useCallback(
		(film: FilmFromSearchModel) => {
			setIsSearchOpen(false);
			setSearchText('');

			buttonRef.current?.getElementsByTagName('button')[0].click();
			if (location.pathname !== `/film/${film.id}`) {
				addFilmToHistory(film);
				navigate(`/film/${film.id}`);
			}
		},
		[buttonRef, addFilmToHistory, navigate, setIsSearchOpen],
	);

	const onInputFocus = useCallback(
		() => setIsSearchOpen(true),
		[setIsSearchOpen],
	);

	useEffect(() => {
		searchText.length === 0 ? deleteFilmsFromSearch() : null;
	}, [searchText]);

	useEffect(() => {
		debouncedSearchText ? loadFilms(debouncedSearchText.trim()) : null;
	}, [debouncedSearchText]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
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
			className={cn(styles.header_searh, 'd-flex')}
			ref={dropdownRef}
		>
			{(filmsToSuggest?.length > 0 ||
				(meta === Meta.success && filmsFromSearch.length > 0) ||
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
									onDropdownClick={onDropdownClick}
								/>
							))}
							<Dropdown.Divider />
						</>
					)}
					{meta !== Meta.success && searchText.length > 0 && (
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
					{meta === Meta.success &&
						filmsFromSearch.map((film: FilmFromSearchModel) => (
							<SearchItem
								key={film.id}
								film={film}
								onDropdownClick={onDropdownClick}
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
									onDropdownClick={onDropdownClick}
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
				onChange={onInputChange}
				onFocus={onInputFocus}
			/>
		</Form>
	);
};

export default Search;
