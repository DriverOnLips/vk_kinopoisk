import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ico from 'assets/ico/logo.ico';
import FilmList from 'pages/FilmList/FilmList';

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
				{/* <Header /> */}
				<Routes>
					<Route
						path='/'
						element={<FilmList />}
					/>
					{/* <Route
							path='/recipe/:id'
							element={<RecipePage />}
						/>
						<Route
							path='/not_found'
							element={<NotFound />}
						/> */}
					{/* <Route
							path='/kts-gastronaut'
							element={<MainPageRedirect />}
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
