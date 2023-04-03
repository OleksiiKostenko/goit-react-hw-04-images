import { useState } from 'react';
import css from '../../css/Styles.module.css';

export const Searchbar = ({ onHandleSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = evt => {
    const { value } = evt.target;
    setQuery(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onHandleSearch(query);
    reset();
  };
  const reset = () => {
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button__label}>Search</span>
        </button>

        <input
          onChange={handleInputChange}
          value={query}
          name="query"
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
