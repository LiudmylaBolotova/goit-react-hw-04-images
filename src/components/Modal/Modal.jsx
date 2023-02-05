import { useEffect } from 'react';
import style from '../Modal/Modal.module.css';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  images: propTypes.arrayOf(
    propTypes.shape({
      src: propTypes.string.isRequired,
      alt: propTypes.string,
    })
  ),
};
