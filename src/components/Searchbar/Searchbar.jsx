import propTypes from 'prop-types';

import { ImSearch } from 'react-icons/im';

import style from '../Searchbar/Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const onSubmitForm = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputValue = form.elements.inputValue.value;

    if (inputValue.trim() === '') {
      return alert('Enter your request!');
    }
    onSubmit(inputValue);

    form.reset();
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
          name="inputValue"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
