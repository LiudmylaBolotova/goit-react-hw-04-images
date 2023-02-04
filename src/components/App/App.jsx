import { useState } from 'react';
import style from './App.module.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export function App() {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
  };

  
    return (
      <div className={style.app}>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>

        <ImageGallery inputValue={inputValue}></ImageGallery>
      </div>
    );
  }

