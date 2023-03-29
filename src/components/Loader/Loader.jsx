import { InfinitySpin } from 'react-loader-spinner';

import css from '../../css/Styles.module.css';

export const Loader = () => {
  return (
    <div className={css.Overlay}>
      <InfinitySpin className={css.Loader} width="200" color="#3f51b5" />
    </div>
  );
};
