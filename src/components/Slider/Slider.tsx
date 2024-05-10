import React, { useCallback, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './Slider.module.scss';

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

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			const value = parseInt(e.target.value, 10);
			setShowButton(true);
			onSliderChange(value);
		},
		[onSliderChange],
	);

	const stopPropagation = useCallback(
		(e: React.MouseEvent<HTMLElement, MouseEvent>) => e.stopPropagation(),
		[],
	);

	const onClick = useCallback(() => {
		setShowButton(false);
		onButtonClick();
	}, [onButtonClick]);

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
