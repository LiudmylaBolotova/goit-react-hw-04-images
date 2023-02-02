import React, { Component } from 'react';
import style from './App.module.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    inputValue: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div className={style.app}>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>

        <ImageGallery inputValue={this.state.inputValue}></ImageGallery>
      </div>
    );
  }
}
