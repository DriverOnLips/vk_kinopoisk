import React, { useRef } from 'react';
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Search from './components/Search/Search';

function Header() {
	const navigate = useNavigate();
	const closeButtonRef = useRef<HTMLDivElement>(null);

	const handleClickLogo = () => {
		closeButtonRef?.current?.getElementsByTagName('button')[0].click();

		if (location.pathname === '/') {
			window.scrollTo(0, 0);
		} else {
			navigate('/');
		}
	};

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
						onClick={handleClickLogo}
						className='text-light'
					>
						Кинопоиск
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
								onClick={handleClickLogo}
							>
								Кинопоиск
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
