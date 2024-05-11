import React, { useCallback } from 'react';
import styles from './Slider.module.scss';

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
		<>
			<input
				type='range'
				min='0'
				max='18'
				value={item}
				onChange={onChange}
			/>
			<div className={styles.dates}>
				<span>{item}+</span>
			</div>
		</>
	);
};

export default Slider;
