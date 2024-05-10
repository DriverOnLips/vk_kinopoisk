import cn from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFilm } from 'hooks/useFilm';
import { FilmFromListModel } from 'types/FilmFromList';
import styles from './FilmItem.module.scss';

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
			className={styles['film_item-card']}
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
						className={styles['film_item-card__img']}
						variant='top'
						src={film.photo}
						style={{
							background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${film.photo})`,
							backgroundPosition: 'center',
						}}
					/>
				</>
			)}
			<Card.Body className={styles['film_item-card__body']}>
				<Card.Title
					className={cn(styles['film_item-card__body__title'], 'mb-3')}
				>
					{film.name}
				</Card.Title>
				<div className={styles['film_item-card__body__details']}>
					<Card.Text className={styles['film_item-card__body__details-text']}>
						Рейтинг: {Math.round(film.rating * 100) / 100}
					</Card.Text>
					<Card.Text
						className={cn(
							styles['film_item-card__body__details-text'],
							styles['film_item-card__body__details-text-right'],
						)}
					>
						{film.genre}, {film.year}
					</Card.Text>
				</div>
			</Card.Body>
		</Card>
	);
};

export default FilmItem;