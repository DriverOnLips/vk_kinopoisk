import React, { useState, useRef, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FilmFromListModel } from 'types/FilmFromList';
import { useFilm } from '../../../../hooks/useFilm';

const FilmItem: React.FC<{
	film: FilmFromListModel;
}> = ({ film }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const navigate = useNavigate();
	const { deleteFilm } = useFilm();

	const handleClick = (movieId: number) => {
		deleteFilm();
		navigate(`/film/${movieId}`);
	};

	const handleMouseEnter = () => {
		setIsPlaying(true);
		if (iframeRef.current) {
			iframeRef.current.contentWindow?.postMessage('play', '*');
		}
	};

	const handleMouseLeave = () => {
		setIsPlaying(false);
		if (iframeRef.current) {
			iframeRef.current.contentWindow?.postMessage('pause', '*');
		}
	};

	useEffect(() => {
		if (isPlaying) {
			if (iframeRef.current) {
				iframeRef.current.contentWindow?.postMessage('play', '*');
			}
		} else {
			if (iframeRef.current) {
				iframeRef.current.contentWindow?.postMessage('pause', '*');
			}
		}
	}, [isPlaying]);

	return (
		<Card
			className='film_item-card'
			id={String(film.id)}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			onClick={() => handleClick(film.id)}
		>
			{isPlaying && film.trailer ? (
				<iframe
					ref={iframeRef}
					src={`${film.trailer}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&iv_load_policy=0`}
					allow='autoplay; encrypted-media'
					allowFullScreen
				></iframe>
			) : (
				<>
					<Card.Img
						className='film_item-card_img'
						variant='top'
						src={film.photo}
						style={{
							background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${film.photo})`,
							backgroundPosition: 'center',
						}}
					/>
				</>
			)}
			<Card.Body className='film_item-card_body'>
				<Card.Title className='film_title mb-3'>{film.name}</Card.Title>
				<div className='film_details'>
					<Card.Text className='film_details-text'>
						Рейтинг: {Math.round(film.rating * 100) / 100}
					</Card.Text>
					<Card.Text className='film_details-text film_details-text-right'>
						{film.genre}, {film.year}
					</Card.Text>
				</div>
			</Card.Body>
		</Card>
	);
};

export default FilmItem;
