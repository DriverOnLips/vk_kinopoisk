import React, { useCallback, useRef } from 'react';
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Search from './components/Search/Search';

function Header() {
	const navigate = useNavigate();
	const closeButtonRef = useRef<HTMLDivElement>(null);

	const onLogoClick = useCallback(() => {
		closeButtonRef?.current?.getElementsByTagName('button')[0].click();

		navigate('/');
	}, [navigate]);

	return (
		<>
			<Navbar
				fixed='top'
				expand={'sm'}
				className='mb-3'
				bg='dark'
				data-bs-theme='dark'
			>
				<Container fluid>
					<Navbar.Brand
						style={{ cursor: 'pointer' }}
						onClick={onLogoClick}
						className='text-light'
					>
						Кино
					</Navbar.Brand>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-sm`}
						aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
						placement='end'
						bg='dark'
						data-bs-theme='dark'
					>
						<Offcanvas.Header
							closeButton
							ref={closeButtonRef}
						>
							<Offcanvas.Title
								id={`offcanvasNavbarLabel-expand-sm`}
								className='text-light'
								onClick={onLogoClick}
							>
								Кино
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body style={{ justifyContent: 'center' }}>
							<Search buttonRef={closeButtonRef} />
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}

export default Header;
