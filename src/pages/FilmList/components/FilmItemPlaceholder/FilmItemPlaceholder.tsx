import cn from 'classnames';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import styles from './FilmItemPlaceholder.module.scss';

function FilmItemPlaceholder() {
	return (
		<Card className={styles.film_item_placeholder}>
			<Placeholder
				className={styles['film_item_placeholder-img']}
				as={Card.Img}
				animation='glow'
			/>

			<Card.Body>
				<Placeholder
					className={cn(styles.film_item_placeholder__title, 'mt-2', 'mb-4')}
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
					className={styles.film_item_placeholder__text}
				>
					<Placeholder xs={4} /> <Placeholder xs={4} />
				</Placeholder>
			</Card.Body>
		</Card>
	);
}

export default FilmItemPlaceholder;
