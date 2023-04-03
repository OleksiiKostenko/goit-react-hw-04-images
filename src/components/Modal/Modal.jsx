import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../../css/Styles.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImage, tags, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleBackdropAndEscClick);

    return () => {
      window.removeEventListener('keydown', handleBackdropAndEscClick);
    };
  });

  const handleBackdropAndEscClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
    if (e.code === 'Escape') toggleModal();
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropAndEscClick}>
      <div className={css.Modal}>
        <img src={largeImage} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};
