import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from '../../services';
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

    (async function () {
      try {
        const finedImages = await fetchImages(inputValue, page, {
          signal: controller.signal,
        });
        setStatus(Status.RESOLVED);
        setImages(prevState => [...prevState, ...finedImages.hits]);
      } catch (error) {
        setStatus(Status.REJECTED);
        console.log(error.message);
      }
    })();

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
    return <Loader />;
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
