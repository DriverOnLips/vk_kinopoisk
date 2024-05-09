import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactSlider from 'react-slider';
import { useApp } from 'hooks/useApp';

function FilmsAgeSelector() {
	const { filmAge, setFilmAge } = useApp();

	const [films, setFilms] = useState<number>(filmAge);
	const [showButton, setShowButton] = useState<boolean>(false);

	const handleSliderChange = (newAge: number) => {
		if (newAge !== films) {
			setFilms(newAge);
			setShowButton(true);
		}
	};

	const handleButtonClick = () => {
		setFilmAge(films);
		setShowButton(false);
		document.body.click();
	};

	return (
		<DropdownButton
			id='films_age-selector'
			title='Возрастное ограничение'
			data-bs-theme='dark'
			variant='secondary'
		>
			<Dropdown.Item
				className='films_age-slider'
				style={{
					all: 'unset',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					margin: '0.5rem',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<ReactSlider
					className='pb-3'
					value={films}
					onChange={handleSliderChange}
					min={0}
					max={18}
					step={1}
					thumbClassName='thumb'
					trackClassName='track'
				/>
				<div className='dates'>
					<span>{films}+</span>
				</div>
				{showButton && (
					<button
						className='btn btn-primary mt-2'
						onClick={handleButtonClick}
					>
						Показать
					</button>
				)}
			</Dropdown.Item>
		</DropdownButton>
	);
}

export default FilmsAgeSelector;
