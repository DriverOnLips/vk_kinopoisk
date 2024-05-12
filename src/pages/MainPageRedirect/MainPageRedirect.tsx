import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainPageRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/', { replace: true });
		window.history.replaceState({}, '', '/');
	}, [navigate]);

	return null;
};
