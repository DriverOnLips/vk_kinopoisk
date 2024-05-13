import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text/Text';
import { FilmFromListModel } from 'types/FilmFromList';
import styles from './FilmItem.module.scss';

const FilmItem: React.FC<{
	film: FilmFromListModel;
}> = ({ film }) => {
	const navigate = useNavigate();

	const onClick = useCallback(
		(movieId: number) => () => {
			navigate(`/film/${movieId}`);
		},
		[navigate],
	);

	return (
		<Card
			className={styles['film_item-card']}
			id={String(film.id)}
			onClick={onClick(film.id)}
		>
			<Card.Img
				className={styles['film_item-card__img']}
				variant='top'
				src={film.photo}
				style={{
					background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${film.photo})`,
					backgroundPosition: 'center',
				}}
			/>
			<Card.Body className={styles['film_item-card__body']}>
				<Text
					className={styles['film_item-card__body__title']}
					color='secondary'
					size='s3'
					text_align='center'
					maxLines={2}
				>
					{film.name}
				</Text>
				<div className={styles['film_item-card__body']}>
					<Text
						color='secondary'
						size='s5'
						weight='light'
						text_align='center'
						maxLines={3}
					>
						{film.description}
					</Text>
					<div className={styles['film_item-card__body__details']}>
						<Text
							className={styles['film_item-card__body__details-text']}
							color='secondary'
							size='s6'
							weight='light'
							text_align='start'
							maxLines={2}
						>
							Рейтинг: {Math.round(film.rating * 100) / 100}
						</Text>
						{/* <Card.Text className={styles['film_item-card__body__details-text']}>
							Рейтинг: {Math.round(film.rating * 100) / 100}
						</Card.Text> */}

						<Text
							className={styles['film_item-card__body__details-text']}
							color='secondary'
							size='s6'
							weight='light'
							text_align='end'
							maxLines={2}
						>
							{film.genre}, {film.year}
						</Text>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default FilmItem;
