import React from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { CountryType } from 'types/CountryType';
import './MultiDropdown.scss';

type MultiDropdownProps = {
	title: string;
	items: CountryType[];
	onClick: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		item: CountryType,
	) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
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
			{items.map((item: CountryType, index: number) => (
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
						label={item.name}
						checked={item.state}
						name='multidropdownSelection'
						disabled
					/>
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
};

export default MultiDropdown;
