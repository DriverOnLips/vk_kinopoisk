import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';
import './FilmPagePlaceholder.scss';

const FilmPagePlaceholder = () => {
	return (
		<Container className='film_info-placeholder'>
			<Row style={{ margin: 0, padding: 0 }}>
				<Col
					sm={5}
					className='film_info-placeholder__photo'
				>
					<Placeholder
						className='film_info-placeholder__photo-img'
						animation='glow'
						as='p'
					/>
				</Col>
				<Col
					sm={7}
					className='film_info-placeholder-div'
				>
					<Placeholder
						as='p'
						animation='glow'
						className='film_info-placeholder-name'
					>
						<Placeholder
							size='lg'
							xs={6}
						/>
					</Placeholder>

					<Placeholder
						as='p'
						animation='glow'
						className='film_info-placeholder-country_genres'
					>
						<Placeholder xs={4} /> <Placeholder xs={4} />
					</Placeholder>

					<Placeholder
						as='p'
						animation='glow'
					>
						<Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />{' '}
						<Placeholder xs={4} /> <Placeholder xs={8} /> <Placeholder xs={4} />{' '}
						<Placeholder xs={6} /> <Placeholder xs={6} /> <Placeholder xs={4} />{' '}
						<Placeholder xs={6} /> <Placeholder xs={2} />{' '}
						<Placeholder xs={10} /> <Placeholder xs={8} />{' '}
						<Placeholder xs={6} /> <Placeholder xs={8} /> <Placeholder xs={4} />{' '}
						<Placeholder xs={6} /> <Placeholder xs={6} /> <Placeholder xs={4} />{' '}
						<Placeholder xs={8} /> <Placeholder xs={2} /> <Placeholder xs={6} />{' '}
						<Placeholder xs={6} /> <Placeholder xs={5} /> <Placeholder xs={6} />{' '}
					</Placeholder>
				</Col>
			</Row>
		</Container>
	);
};

export default FilmPagePlaceholder;
