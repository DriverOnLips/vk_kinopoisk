import React, { useCallback, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactSlider from 'react-slider';

type SliderProps = {
	item: number;
	onSliderChange: (item: number) => void;
	onButtonClick: () => void;
};

const Slider: React.FC<SliderProps> = ({
	item,
	onSliderChange,
	onButtonClick,
}) => {
	const [showButton, setShowButton] = useState<boolean>(false);

	const onChange = useCallback(() => {
		setShowButton(true);
		onSliderChange;
	}, [onSliderChange]);

	const stopPropagation = useCallback(
		(e: React.MouseEvent<HTMLElement, MouseEvent>) => e.stopPropagation(),
		[],
	);

	const onClick = useCallback(() => {
		setShowButton(false);
		onButtonClick;
	}, [onButtonClick]);

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
				onClick={stopPropagation}
			>
				<ReactSlider
					className='pb-3'
					value={item}
					onChange={onChange}
					min={0}
					max={18}
					step={1}
					thumbClassName='thumb'
					trackClassName='track'
				/>
				<div className='dates'>
					<span>{item}+</span>
				</div>
				{showButton && (
					<button
						className='btn btn-primary mt-2'
						onClick={onClick}
					>
						Показать
					</button>
				)}
			</Dropdown.Item>
		</DropdownButton>
	);
};

export default Slider;
