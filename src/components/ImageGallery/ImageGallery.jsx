import React, { Component } from 'react';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';
import propTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevValue !== nextValue || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      axios
        .get(
          `https://pixabay.com/api/?q=${nextValue}&page=${nextPage}&key=29672596-80b7f00160ec49143013d00d9&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          this.setState(prevState => ({
            status: 'resolved',
            images: [...res.data.hits, ...prevState.images],
          }));
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }

    if (prevValue !== nextValue) {
      this.setState({
        images: [],
        page: 1,
        status: 'idle',
        error: null,
      });
    }
  }

  LoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return (
        <h2 className={style.galleryText}>
          Enter a keyword in the search bar!
        </h2>
      );
    }

    if (status === 'pending') {
      return <Loader></Loader>;
    }

    if (status === 'resolved' && images.length > 0) {
      return (
        <>
          <ul className={style.gallery}>
            <ImageGalleryItem images={this.state.images}></ImageGalleryItem>
          </ul>
          <Button type="button" onClick={this.LoadMore}></Button>
        </>
      );
    }

    if (status === 'rejected' || images.length === 0) {
      return (
        <h2 className={style.galleryTextError}>
          We didn't find the picture you were looking for :( Please try again!
        </h2>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: propTypes.arrayOf(propTypes.object.isRequired),
  inputValue: propTypes.string.isRequired,
};
