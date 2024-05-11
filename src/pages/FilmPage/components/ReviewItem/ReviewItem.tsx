import cn from 'classnames';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { FilmReviewModel } from 'types/FilmReview';
import styles from './ReviewItem.module.scss';

const ReviewItem: React.FC<FilmReviewModel> = ({
	username,
	title,
	type,
	review,
	date,
}) => {
	return (
		<Card className={styles.review_item}>
			<Card.Body>
				<Card.Title className={styles.review_item__title}>{title}</Card.Title>
				<Card.Subtitle
					className={cn(styles.review_item__type, 'my-2', 'text-muted')}
				>
					{type}
				</Card.Subtitle>
				<Card.Text className={cn(styles.review_item__text, 'my-2')}>
					{review}
				</Card.Text>
				<Card.Text className={styles.review_item__username}>
					{username}
				</Card.Text>
				<Card.Text className={styles.review_item__date}>{date}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ReviewItem;
