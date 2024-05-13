import React from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import './MultiDropdown.scss';

type MultiDropdownProps<T> = {
	title: string;
	items: T[];
	onClick: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		item: T,
	) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps<any>> = ({
	title,
	items,
	onClick,
}) => {
	return (
		<DropdownButton
			className='multidropdown'
			title={title}
			data-bs-theme='dark'
			variant='secondary'
		>
			{items.map((item: any, index: number) => (
				<Dropdown.Item
					className='multidropdown_item'
					key={index}
					onClick={(e) =>
						onClick(e as React.MouseEvent<HTMLDivElement, MouseEvent>, item)
					}
				>
					<Form.Check
						className='multidropdown_item-check'
						type='radio'
						label={item.name || `${item.age} +`}
						checked={item.state}
						name='multidropdownSelection'
						disabled
					/>
					{/* Так можно проверить */}
					{/* <span>{(item.state.toString() == 'true').toString()}</span>  */}
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
};

export default MultiDropdown;
