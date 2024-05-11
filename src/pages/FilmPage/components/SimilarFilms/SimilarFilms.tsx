import React, { useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Paginator from 'components/Pagination/Pagination';
import { useFilm } from 'hooks/useFilm';
import { SimilarFilmsType } from 'types/Film';

const SimilarFilms: React.FC<{
	movies: SimilarFilmsType[];
}> = ({ movies }) => {
	const [page, setPage] = useState<number>(1);
	const navigate = useNavigate();
	const { deleteFilm } = useFilm();

	const handleClick = (movieId: number) => {
		deleteFilm();
		navigate(`/film/${movieId}`);
	};

	return (
		<Container className='similar_movies'>
			<Row className='similar_movies__gallery'>
				{movies?.slice(6 * (page - 1), 6 * page).map((movie) => (
					<Col
						key={movie.id}
						sm={2}
						className='similar_movies__item'
						onClick={() => handleClick(movie.id)}
					>
						<Row>
							<Image
								src={movie.photo}
								className='similar_movies__item-img'
							/>
						</Row>
						<Row>
							<span className='similar_movies__item-span'>{movie.name}</span>
						</Row>
					</Col>
				))}
			</Row>
			{/* <Paginator
				page={page}
				pages={Math.ceil(movies?.length / 6)}
				onPageChange={setPage}
			/> */}
		</Container>
	);
};

export default SimilarFilms;
