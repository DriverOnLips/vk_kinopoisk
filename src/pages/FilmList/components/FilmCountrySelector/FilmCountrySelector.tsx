import React from 'react';
import { Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useApp } from 'hooks/useApp';
import { CountryType } from 'types/CountryType';

const FilmCountrySelector: React.FC = () => {
	const { filmCountry, setFilmCountry } = useApp();

	const handleSelect = (e: any, country: CountryType) => {
		e.preventDefault();

		const resetCountries = filmCountry.map((c: CountryType) => ({
			...c,
			state: false,
		}));

		const selectedCountry = resetCountries.find(
			(c: CountryType) => c.name === country.name,
		);
		if (selectedCountry) {
			selectedCountry.state = true;
		}

		setFilmCountry(resetCountries);
	};

	return (
		<DropdownButton
			className='country_dropdown'
			title='Страна'
			data-bs-theme='dark'
			variant='secondary'
		>
			{filmCountry.map((country: CountryType, index: number) => (
				<Dropdown.Item
					className='country_item'
					key={index}
					onClick={(e) => handleSelect(e, country)}
				>
					<Form.Check
						className='country_item-check'
						type='radio'
						label={country.name}
						checked={country.state}
						name='countrySelection'
						disabled
					/>
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
};

export default FilmCountrySelector;
