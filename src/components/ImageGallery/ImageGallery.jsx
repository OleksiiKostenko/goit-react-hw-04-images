import css from '../../css/Styles.module.css'

export const ImageGallery = ({ children }) => {
  return (
    <ul className={css.ImageGallery}>
      {children}
    </ul>
  );
};
