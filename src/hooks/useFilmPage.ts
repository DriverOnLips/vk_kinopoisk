import { useDispatch, useSelector } from 'react-redux';
import { SetFilm, DeleteFilm, SetMeta } from 'stores/FilmPageStore';
import { FilmModel, normalizeFilm } from 'types/Film';
import { FilmReviewApi, normalizeFilmReview } from 'types/FilmReview';
import { RootState } from 'types/StoreTypes';
import { Api } from 'utils/api';
import { Meta } from 'utils/meta';

export const useFilmPage = () => {
	const api = new Api();

	const { meta, film } = useSelector((state: RootState) => state.filmPage);

	const dispatch = useDispatch();

	const setFilm = async (id: number) => {
		if (meta === Meta.loading) {
			return;
		}

		dispatch(SetMeta(Meta.loading));

		const response = await api.getFilmInfo(id);

		const filmFromResponse: FilmModel = normalizeFilm(response);

		const reviews = await api.getFilmReviews(id);
		filmFromResponse.reviews = reviews?.docs?.map((review: FilmReviewApi) =>
			normalizeFilmReview(review),
		);

		dispatch(SetFilm(filmFromResponse));
		dispatch(SetMeta(Meta.success));
	};

	const deleteFilm = () => {
		dispatch(DeleteFilm());
		dispatch(SetMeta(Meta.initial));
	};

	return {
		meta,
		film,
		deleteFilm,
		setFilm,
	};
};
