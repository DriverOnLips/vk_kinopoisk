import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ico from 'assets/ico/logo.ico';
import Header from 'components/Header/Header';
import FilmList from 'pages/FilmList/FilmList';
import 'styles/index.scss';

const App = () => {
	return (
		<HelmetProvider>
			<Helmet>
				<link
					rel='icon'
					type='image/svg+xml'
					href={ico}
				/>
			</Helmet>

			{/* Used for gh-pages */}
			{/* <BrowserRouter basename='/kts-gastronaut'> */}
			<BrowserRouter basename='/'>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<FilmList />}
					/>
					{/* <Route
							path='/film/:id'
							element={<FilmPage />}
						/>
						<Route
							path='/not_found'
							element={<NotFound />}
						/> */}
					{/* <Route
							path='*'
							element={<NotFound />}
						/> */}
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
};

export default App;
