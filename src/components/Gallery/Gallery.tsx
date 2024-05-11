import React, { ComponentType } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './Gallery.scss';

type GalleryProps<T> = {
	items: T[];
	ItemElement: ComponentType<T>;
};

const Gallery: React.FC<GalleryProps<any>> = ({ items, ItemElement }) => {
	return (
		<Container className='gallery'>
			<Carousel interval={null}>
				{items?.map((item) => (
					<Carousel.Item key={item.id}>
						<div className='gallery__items'>
							<ItemElement {...item} />
						</div>
					</Carousel.Item>
				))}
			</Carousel>
		</Container>
	);
};

export default Gallery;
