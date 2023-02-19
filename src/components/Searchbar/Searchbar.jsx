import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from 'react-icons/md';

import { Searchbar, SearchForm } from './Searchbar.styled';

export default function SearchBar({ onSubmit = () => {} }) {
  const [value, setValue] = useState('');

  const handleInputChange = event => {
    const { value } = event.target;

    setValue(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const normalizedValue = value.trim().toLowerCase();
    onSubmit({ value: normalizedValue });

    setValue('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <MdOutlineImageSearch size={'70%'} />
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="value"
          value={value}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
