import { Searchbar } from './Searchbar/Searchbar';
import { useEffect } from 'react';

import { getImages } from '../services/getImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useInputContex } from './Context/Context';

export function App() {

  const {
    query,
    setQuery,
    page,
    setPage,
    images,
    setImages,
    isLoading,
    setIsLoading,
    isLoadBtn,
    setIsLoadBtn,
    isShowModal,
    setIsShowModal,
    largeImage,
    setLargeImage,
    tags,
    setTags,
  } = useInputContex();


  const handleSearch = searchQuery => {
    if (query === searchQuery) {
      return Report.info('Oops', 'You need to input search value');
    }
    else if (searchQuery.trim() === '') {
      return Report.info('Oops', 'You need to input search value');
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setIsLoadBtn(false);
  };



  useEffect(() => {
    if (query.trim() === '') {
      return ;
    }
    setIsLoading(true);
    setTimeout(() => {
      getImages(query, page)
        .then(response => response.json())
        .then(data => {
          if (data.total === 0) {
            return Report.info('Not found', 'Input valid search value');
          }
          if (data.total <= 12) {
            setImages(data.hits);
          }
          if (data.total > 12) {
            if (data.hits.length < 11) {
              setIsLoadBtn(false);
              setImages(images => [...images, ...data.hits]);
            } else {
              setIsLoadBtn(true);
              setImages(images => [...images, ...data.hits]);
            }
          }
        })
        .catch(error => {
          Report.failure('Error', `${error}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }, [page, query,setImages,setIsLoadBtn,setIsLoading]);

  const handleClickButton = () => {
    setPage(prevPage => prevPage + 1);
  };
  const toggleModal = (image, tags) => {
    setIsShowModal(!isShowModal);
    setLargeImage(image);
    setTags(tags);
  };

  return (
    <>
      <Searchbar onHandleSearch={handleSearch} />
      {isLoading && <Loader />}
      <ImageGallery>
        <ImageGalleryItem toggleModal={toggleModal} images={images} />
      </ImageGallery>
      {isLoadBtn && <Button onClick={handleClickButton} />}
      {isShowModal && (
        <Modal
          largeImage={largeImage}
          tags={tags}
          toggleModal={toggleModal}
        ></Modal>
      )}
    </>
  );
}
