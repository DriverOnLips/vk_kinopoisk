import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function FilmItemPlaceholder() {
	return (
		<Card className='film_item-placeholder'>
			<Placeholder
				className='film_item-placeholder_img'
				as={Card.Img}
				animation='glow'
			/>

			<Card.Body className='film_item-placeholder_body'>
				<Placeholder
					className='placeholder_title mt-2 mb-4'
					as={Card.Title}
					animation='glow'
				>
					<Placeholder
						xs={6}
						size='lg'
					/>
				</Placeholder>
				<Placeholder
					as={Card.Text}
					animation='glow'
					className='placeholder_text'
				>
					<Placeholder xs={4} /> <Placeholder xs={4} />
				</Placeholder>
			</Card.Body>
		</Card>
	);
}

export default FilmItemPlaceholder;
