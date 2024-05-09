import { useDispatch, useSelector } from 'react-redux';
import {
	SetFilmAge,
	SetFilmCountry,
	SetPage,
	SetPages,
	SetIsSearchOpen,
} from 'stores/AppStore/AppStore';
import { CountryType } from 'types/CountryType';

export function useApp() {
	const { filmAge, filmCountry, page, pages, isSearchOpen } = useSelector(
		(store: any) => store.app,
	);

	const dispatch = useDispatch();

	const setFilmAge = (age: number) => {
		dispatch(SetFilmAge(age));
	};

	const setFilmCountry = (countries: CountryType[]) => {
		dispatch(SetFilmCountry(countries));
	};

	const setPage = (pg: number) => {
		pg !== page && dispatch(SetPage(pg));
	};

	const setPages = (pgs: number) => {
		pgs !== pages && dispatch(SetPages(pgs));
	};

	const setIsSearchOpen = (isOpen: boolean) =>
		dispatch(SetIsSearchOpen(isOpen));

	return {
		filmAge,
		filmCountry,
		page,
		pages,
		isSearchOpen,
		setFilmAge,
		setFilmCountry,
		setPage,
		setPages,
		setIsSearchOpen,
	};
}
