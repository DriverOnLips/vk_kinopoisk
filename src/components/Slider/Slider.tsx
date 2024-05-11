import React, { useCallback } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
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

	const stopPropagation = useCallback(
		(e: React.MouseEvent<HTMLElement, MouseEvent>) => e.stopPropagation(),
		[],
	);

	return (
		<DropdownButton
			id='slider_selector'
			title='Возрастное ограничение'
			data-bs-theme='dark'
			variant='secondary'
		>
			<Dropdown.Item
				className={styles.slider}
				style={{
					all: 'unset',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					margin: '0.5rem',
				}}
				onClick={stopPropagation}
			>
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
			</Dropdown.Item>
		</DropdownButton>
	);
};

export default Slider;
