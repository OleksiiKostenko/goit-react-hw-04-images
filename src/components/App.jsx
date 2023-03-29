import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { getImages } from '../services/getImage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Report } from 'notiflix/build/notiflix-report-aio';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isLoadButton: false,
    isShowModal: false,
    largeImage: '',
    tags: '',
  };

  handleSearch = searchQuery => {
    if (this.state.query === searchQuery) {
      return;
    }
    this.setState({
      query: searchQuery,
      page: 1,
      images: [],
      isLoadButton: false,
    });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query.trim() === '') {
      return Report.info('Oops', 'You need to input search value');
    }
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        getImages(this.state.query, this.state.page)
          .then(response => response.json())
          .then(data => {
            if (data.total === 0) {
              return Report.info('Not found', 'Input valid search value');
            }
            if (data.total <= 12) {
              this.setState({ images: data.hits });
            }
            if (data.total > 12) {
              data.hits.length < 11
                ? this.setState(prevState => ({
                    isLoadButton: false,
                    images: [...prevState.images, ...data.hits],
                  }))
                : this.setState(prevState => ({
                    isLoadButton: true,
                    images: [...prevState.images, ...data.hits],
                  }));
            }
          })
          .catch(error => {
            Report.failure('Error', `${error}`);
          })
          .finally(() => {
            this.setState({ isLoading: false });
          });
      }, 1000);
    }
  }

  handleClickButton = e => {
    e.preventDefault();
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  toggleModal = (image, tags) => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
      largeImage: image,
      tags: tags,
    }));
  };

  render() {
    const { images, isLoading, isLoadButton, isShowModal, largeImage, tags } =
      this.state;
    return (
      <>
        <Searchbar onHandleSearch={this.handleSearch} />
        {isLoading && <Loader />}
        <ImageGallery>
          <ImageGalleryItem toggleModal={this.toggleModal} images={images} />
        </ImageGallery>
        {isLoadButton && <Button onClick={this.handleClickButton} />}
        {isShowModal && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            toggleModal={this.toggleModal}
          ></Modal>
        )}
      </>
    );
  }
}
