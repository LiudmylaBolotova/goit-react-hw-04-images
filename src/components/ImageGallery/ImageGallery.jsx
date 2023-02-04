import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import propTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery({ inputValue }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

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
        setError(error);
      });

    return () => {
      controller.abort();
    };
  }, [inputValue, page]);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setStatus(Status.IDLE);
    setError(null);
  }, [inputValue]);

  const LoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === Status.IDLE) {
    return (
      <h2 className={style.galleryText}>Enter a keyword in the search bar!</h2>
    );
  }

  if (status === Status.PENDING) {
    return <Loader></Loader>;
  }

  if (status === Status.RESOLVED && images.length > 0) {
    return (
      <>
        <ul className={style.gallery}>
          <ImageGalleryItem images={images}></ImageGalleryItem>
        </ul>
        <Button type="button" onClick={LoadMore}></Button>
      </>
    );
  }

  if (status === Status.REJECTED || images.length === 0) {
    return (
      <h2 className={style.galleryTextError}>
        We didn't find the picture you were looking for :( Please try again!
      </h2>
    );
  }
}

ImageGallery.propTypes = {
  images: propTypes.arrayOf(propTypes.object.isRequired),
  inputValue: propTypes.string.isRequired,
};
