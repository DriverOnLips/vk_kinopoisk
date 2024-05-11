import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { FilmReviewModel } from 'types/FilmReview';
import ReviewItem from './ReviewItem/ReviewItem';

const Reviews: React.FC<{ reviews: FilmReviewModel[] }> = ({ reviews }) => {
	return (
		<Container className='reviews'>
			<Carousel interval={null}>
				{reviews?.map((review) => (
					<Carousel.Item key={review.id}>
						<div className='reviews_carousel'>
							<ReviewItem {...review} />
						</div>
					</Carousel.Item>
				))}
			</Carousel>
		</Container>
	);
};

export default Reviews;
