import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../../css/Styles.module.css';


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  componentDidMount() {
  window.addEventListener('keydown', this.hendleCloseKey)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleCloseKey)
  }
  hendleCloseKey = (e) => {
    if(e.code==='Escape') this.props.toggleModal()
  }

   handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.toggleModal();
    }
  };

  render() {
    console.log('this.props', this.props)
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt={this.props.tags} />
        </div>
      </div>,modalRoot
    );
  }
}
