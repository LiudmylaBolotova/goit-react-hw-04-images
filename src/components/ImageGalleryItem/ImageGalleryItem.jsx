import propTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import style from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    isActiveImg: 0,
  };

  makeActiveImg = index => {
    this.setState({ isActiveImg: index });
  };

  toggleOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  openModalImage = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({ isModalOpen: true });
    }
  };

  render() {
    const activeImg = this.props.images[this.state.isActiveImg];

    return (
      <>
        {this.props.images.map(({ webformatURL, tags, id }, index) => (
          <div key={id}>
            <li
              className={style.imageGalleryItem}
              onClick={() => this.makeActiveImg(index)}
            >
              <img
                src={webformatURL}
                alt={tags}
                className={style.imageGalleryItemImage}
                onClick={this.openModalImage}
              />
            </li>

            {this.state.isModalOpen && (
              <Modal onClose={this.toggleOpen}>
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
