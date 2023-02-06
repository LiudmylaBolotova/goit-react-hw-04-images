import propTypes from 'prop-types';
import style from '../ImageGallery/ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

export function ImageGallery({ images, LoadMore }) {
  return (
    <>
      <ul className={style.gallery}>
        <ImageGalleryItem images={images}></ImageGalleryItem>
      </ul>
      <Button type="button" onClick={LoadMore}></Button>
    </>
  );
}

ImageGallery.propTypes = {
  images: propTypes.arrayOf(propTypes.object.isRequired),
  LoadMore: propTypes.func.isRequired,
};
