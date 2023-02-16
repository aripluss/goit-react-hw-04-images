import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';

import { AppStyled } from './App.styled';

import * as api from '../service/api';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    totalImages: 0,
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    modalContent: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, error } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }

    if (prevState.error !== error && error) {
      toast.error(error);

      this.setState({
        error: null,
      });
    }
  }

  getImages = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    try {
      const { images, totalImages } = await api.getImages(query, page);

      if (!totalImages) {
        toast.warning(`No images found, please try another query. 🔄`);
        return;
      }

      if (page === 1) {
        toast.success(`Here you go! Found ${totalImages} images! 🥰`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        totalImages,
        error: null,
      }));

      if (images.length > 1 && images.length < 12) {
        this.setState({
          error: "Sorry. That's all we could find. 😭",
        });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getByQuery = ({ value }) => {
    if (!value) {
      this.setState({
        error: 'Type something. 👉👈',
      });

      return;
    }

    if (value === this.state.query) {
      this.setState({
        error:
          'You are already seeing the image by this query. Please, change your request. 🔄',
      });

      return;
    }

    this.setState({
      query: value,
      page: 1,
      images: [],
      totalImages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = content => {
    this.setState({ modalContent: content });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { images, totalImages, isLoading, error, showModal, modalContent } =
      this.state;

    return (
      <AppStyled>
        <SearchBar onSubmit={this.getByQuery} />

        {images.length !== 0 && (
          <ImageGallery
            images={images}
            handleOpenModal={this.handleOpenModal}
          />
        )}

        {this.state.isLoading && <Loader />}

        {!isLoading && !error && !images.length && (
          <p
            style={{
              textAlign: 'center',
            }}
          >
            Sorry. There are no images yet...
          </p>
        )}

        {!isLoading && !!images.length && totalImages !== images.length && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal content={modalContent} toggleModal={this.toggleModal} />
        )}

        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AppStyled>
    );
  }
}
