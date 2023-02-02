import propTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

import style from '../Searchbar/Searchbar.module.css';

const initialState = {
  inputValue: '',
};
export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChangeInput = event => {
    this.setState({ inputValue: event.target.value.toLowerCase() });
  };

  onSubmitForm = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() === '') {
      return alert('Enter your request!');
    }
    this.props.onSubmit(this.state.inputValue);

    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form onSubmit={this.onSubmitForm} className={style.searchForm}>
          <button type="submit" className={style.searchFormButton}>
            <ImSearch />
            <span className={style.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.searchFormInput}
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChangeInput}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
