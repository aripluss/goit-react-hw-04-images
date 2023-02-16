import PropTypes from 'prop-types';
import { ImageGalleryItemStyled } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  smallImg,
  largeImg,
  alt,
  handleOpenModal = () => {},
}) => {
  const onClick = event => {
    event.preventDefault();

    handleOpenModal({ img: largeImg, alt });
  };

  return (
    <ImageGalleryItemStyled onClick={onClick}>
      <img src={smallImg} alt={alt} className="gallery-image" loading="lazy" />
    </ImageGalleryItemStyled>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};
