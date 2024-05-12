import React, { useCallback } from 'react';
import { DropdownButton } from 'react-bootstrap';
import './Slider.scss';

type SliderProps = {
	item: number;
	onSliderChange: (item: number) => void;
};

const Slider: React.FC<SliderProps> = ({ item, onSliderChange }) => {
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			const value = parseInt(e.target.value, 10);
			onSliderChange(value);
		},
		[onSliderChange],
	);

	return (
		<DropdownButton
			data-bs-theme='dark'
			variant='secondary'
			title='Возрастное ограничение'
			className='dropdown_slider'
		>
			<input
				type='range'
				min='0'
				max='18'
				value={item}
				onChange={onChange}
			/>
			<div className='dropdown_slider__dates'>
				<span>{item}+</span>
			</div>
		</DropdownButton>
	);
};

export default Slider;
