import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import style from './App.module.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  const handleSearchForm = inputValue => {
    setImages([]);
    setPage(1);
    setStatus(Status.IDLE);
    setInputValue(inputValue);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (!inputValue) {
      return;
    }

    setStatus(Status.PENDING);
    axios
      .get(
        `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=29672596-80b7f00160ec49143013d00d9&image_type=photo&orientation=horizontal&per_page=12`,
        { signal: controller.signal }
      )
      .then(res => {
        setStatus(Status.RESOLVED);
        setImages(prevState => [...prevState, ...res.data.hits]);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        console.log(error.message);
      });

    return () => {
      controller.abort();
    };
  }, [inputValue, page]);

  const LoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === Status.IDLE) {
    return (
      <>
        <Searchbar onSubmit={handleSearchForm}></Searchbar>
        <h2 className={style.galleryText}>
          Enter a keyword in the search bar!
        </h2>
      </>
    );
  }

  if (status === Status.PENDING) {
    <Searchbar onSubmit={handleSearchForm}></Searchbar>;
    return <Loader></Loader>;
  }

  if (status === Status.RESOLVED && images.length > 0) {
    return (
      <>
        <Searchbar onSubmit={handleSearchForm}></Searchbar>
        <ImageGallery images={images} LoadMore={LoadMore}></ImageGallery>
      </>
    );
  }

  if (status === Status.REJECTED || images.length === 0) {
    return (
      <>
        <Searchbar onSubmit={handleSearchForm}></Searchbar>
        <h2 className={style.galleryTextError}>
          We didn't find the picture you were looking for :( Please try again!
        </h2>
      </>
    );
  }
}
