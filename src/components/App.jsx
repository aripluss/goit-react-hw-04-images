import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';

import { AppStyled } from './App.styled';

import * as api from '../service/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!query) return;

    // const getImages = async () => {
    (async function () {
      setIsLoading(true);

      try {
        const { images, totalImages } = await api.getImages(query, page);

        if (!totalImages) {
          toast.warning(`No images found, please try another query. 🔄`);
          return;
        }

        if (page === 1) {
          toast.success(`Here you go! Found ${totalImages} images! 🥰`);
        }

        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalImages);
        setError(null);

        if (images.length > 1 && images.length < 12) {
          setError("Sorry. That's all we could find. 😭");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    // };

    // getImages();
  }, [page, query]);

  useEffect(() => {
    if (error) toast.error(error);
    setError(null);
  }, [error]);

  const getByQuery = ({ value }) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setError('Type something. 👉👈');
      return;
    }

    if (trimmedValue === query) {
      setError(
        'You are already seeing the image by this query. Please, change your request. 🔄'
      );
      return;
    }

    setQuery(trimmedValue);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    scrollPage();
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 300);
  };

  const handleOpenModal = content => {
    setModalContent(content);

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <AppStyled>
      <SearchBar onSubmit={getByQuery} />

      {images.length !== 0 && (
        <ImageGallery images={images} handleOpenModal={handleOpenModal} />
      )}

      {isLoading && <Loader />}

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
        <Button handleLoadMore={handleLoadMore} />
      )}

      {showModal && <Modal content={modalContent} toggleModal={toggleModal} />}

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
