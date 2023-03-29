import React, { Component } from 'react';
import css from '../../css/Styles.module.css';

export class Button extends Component {
  onLoadMore = e => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    return (
      <div className={css.Wrapp_btn}>
        <button type="button" onClick={this.onLoadMore} className={css.Button}>
        Load More
      </button>
      </div>
      
    );
  }
}
