import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import * as tr from '@/translations';

import ImagePopup from './ImagePopup';

class ImageUploader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isImagePopupActive: false,
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.onToggleImagePopup = this.onToggleImagePopup.bind(this);
  }

  onToggleImagePopup() {
    this.setState({
      isImagePopupActive: !this.state.isImagePopupActive,
    });
  }

  onSelectImage(e, image) {
    e.stopPropagation();
    this.props.input.onChange(image);
    this.onToggleImagePopup();
  }

  render() {
    const {
      input,
    } = this.props;

    return ([
      this.state.isImagePopupActive && <ImagePopup
        key='image-popup'
        onSelectImage={this.onSelectImage}
        onClosePopup={this.onToggleImagePopup}
      />
      ,
      input.value
        ? <div
            key='image'
            style={{ backgroundImage: `url('/images/${input.value}')` }}
            className='form__field form__field--image'
            onClick={this.onToggleImagePopup}
          />
        : <div
            key='placeholder'
            className='form__field form__field--image placeholder'
            onClick={this.onToggleImagePopup}
          ><Translate id={tr.IMAGE_SELECT} /></div>
    ]);
  }
}

ImageUploader.propTypes = {
  input: PropTypes.object,
};

export default ImageUploader;
