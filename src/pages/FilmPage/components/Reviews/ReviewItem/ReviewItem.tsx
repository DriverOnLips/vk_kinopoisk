import React from 'react';
import Card from 'react-bootstrap/Card';
import { FilmReviewModel } from 'types/FilmReview';

const ReviewItem: React.FC<FilmReviewModel> = ({
	username,
	title,
	type,
	review,
	date,
}) => {
	return (
		<Card className='review_item'>
			<Card.Body>
				<Card.Title className='review_title'>{title}</Card.Title>
				<Card.Subtitle className='review_type my-2 text-muted'>
					{type}
				</Card.Subtitle>
				<Card.Text className='review_text my-2'>{review}</Card.Text>
				<Card.Text className='review_username'>{username}</Card.Text>
				<Card.Text className='review_date'>{date}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ReviewItem;
