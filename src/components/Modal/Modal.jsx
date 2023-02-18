import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalOverlay } from './Modal.styled';

export default function Modal({
  toggleModal = () => {},
  content: { img, alt },
}) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = event => {
    if (
      // event.target.nodeName !== 'IMG' ||
      // event.target.classList.contains('overlay') ||
      event.target === event.currentTarget ||
      event.key === 'Escape'
    ) {
      toggleModal();
    }
  };

  return (
    <ModalOverlay onClick={closeModal} className="overlay">
      <div className="modal">
        <img src={img} alt={alt} loading="lazy" />
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  content: PropTypes.shape({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
