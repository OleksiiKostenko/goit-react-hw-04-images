import css from '../../css/Styles.module.css'

export const ImageGalleryItem = ({ images, toggleModal }) => {
  
  return (
    <>
    {images&&images.map(({ id,largeImageURL,tags,webformatURL}) => <li  key={id} className={css.ImageGalleryItem}>
        <img onClick={()=>toggleModal(largeImageURL,tags)} className={css.ImageGalleryItem_image} src={webformatURL
} alt={tags} />
      </li>)}</>
    )
};
 