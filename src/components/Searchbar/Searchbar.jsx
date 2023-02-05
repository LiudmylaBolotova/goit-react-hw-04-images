import propTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';

import style from '../Searchbar/Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = event => {
    setInputValue(event.target.value.toLowerCase());
  };

  const onSubmitForm = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return alert('Enter your request!');
    }
    onSubmit(inputValue);

    reset();
  };

  const reset = () => {
    setInputValue('');
  };

  return (
    <header className={style.searchbar}>
      <form onSubmit={onSubmitForm} className={style.searchForm}>
        <button type="submit" className={style.searchFormButton}>
          <ImSearch />
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.searchFormInput}
          type="text"
          value={inputValue}
          onChange={handleChangeInput}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
