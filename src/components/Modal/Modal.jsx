import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalOverlay } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = event => {
    console.log('event.target', event.target);
    console.log('event.currentTarget', event.currentTarget);

    if (
      // event.target.nodeName !== 'IMG' ||
      // event.target.classList.contains('overlay') ||
      event.target === event.currentTarget ||
      event.key === 'Escape'
    ) {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <ModalOverlay onClick={this.closeModal} className="overlay">
        <div className="modal">
          <img
            src={this.props.content.img}
            alt={this.props.content.alt}
            loading="lazy"
          />
        </div>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.shape({
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
