import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPageRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/', { replace: true });
		window.history.replaceState({}, '', '/');
	}, [navigate]);

	return null;
};

export default memo(MainPageRedirect);
