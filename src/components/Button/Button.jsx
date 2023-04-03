import css from '../../css/Styles.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.Wrapp_btn}>
      <button type="button" onClick={onClick} className={css.Button}>
        Load More
      </button>
    </div>
  );
};
