import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SetString } from 'stores/QueryParamsStore';
import { RootState } from 'types/StoreTypes';

export const useQueryParams = () => {
	const { params } = useSelector((state: RootState) => state.queryParams);
	const { search } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(SetString(search));
	}, [dispatch, search]);

	const getParam = (
		key: string,
	): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] => {
		return params[key];
	};

	return { params, getParam };
};
