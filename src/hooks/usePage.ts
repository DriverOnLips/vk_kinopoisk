import { useDispatch, useSelector } from 'react-redux';
import { SetPage, SetPages } from 'stores/PageStore';
import { RootState } from 'types/StoreTypes';

export const usePage = () => {
	const { page, pages } = useSelector((store: RootState) => store.page);

	const dispatch = useDispatch();

	const setPage = (pg: number) => {
		pg !== page && dispatch(SetPage(pg));
	};

	const setPages = (pgs: number) => {
		pgs !== pages && dispatch(SetPages(pgs));
	};

	return {
		page,
		pages,
		setPage,
		setPages,
	};
};
