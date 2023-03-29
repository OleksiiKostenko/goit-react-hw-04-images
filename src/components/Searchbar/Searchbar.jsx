import React, { Component } from 'react';
import css from '../../css/Styles.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = evt => {
    const { value } = evt.target;
    this.setState({
      query: value,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onHandleSearch(this.state.query);
    this.reset();
  };
  reset = () => {
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button__label}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            value={this.state.query}
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
  }
}
