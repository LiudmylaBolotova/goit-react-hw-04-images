import propTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { useState } from 'react';

export function ImageGalleryItem({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActiveImg, setIsActiveImg] = useState(0);

  const makeActiveImg = index => {
    setIsActiveImg(index);
  };

  const toggleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModalImage = event => {
    if (event.target.nodeName === 'IMG') {
      setIsModalOpen(true);
    }
  };

  const activeImg = images[isActiveImg];

  return (
    <>
      {images.map(({ webformatURL, tags, id }, index) => (
        <div key={id}>
          <li
            className={style.imageGalleryItem}
            onClick={() => makeActiveImg(index)}
          >
            <img
              src={webformatURL}
              alt={tags}
              className={style.imageGalleryItemImage}
              onClick={openModalImage}
            />
          </li>

          {isModalOpen && (
            <Modal onClose={toggleOpen}>
              <img
                src={activeImg.largeImageURL}
                alt={tags}
                width={850}
                height={500}
              />
            </Modal>
          )}
        </div>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      largeImageURL: propTypes.string.isRequired,
      alt: propTypes.string,
    })
  ),
};
