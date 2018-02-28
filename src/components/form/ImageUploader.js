import React from 'react';
import PropTypes from 'prop-types';

import ImagePopup from './ImagePopup';

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupActive: false,
    };

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.selectImage = this.selectImage.bind(this);
  }

  openPopup() {
    this.setState(() => ({ isPopupActive: true }));
  }

  closePopup(e) {
    if (e.target.id === 'image-popup') {
      this.setState(() => ({ isPopupActive: false }));
    }
  }

  selectImage(image) {
    this.props.input.onChange(image);
    this.setState(() => ({ isPopupActive: false }));
  }

  render() {
    const {
      input,
    } = this.props;

    return ([
      this.state.isPopupActive && <ImagePopup
        key='image-popup'
        onClosePopup={this.closePopup}
        onSelectImage={this.selectImage}
      />
      ,
      input.value
        ? <div
            key='image'
            style={{ backgroundImage: `url('/images/${input.value}')` }}
            className='form__field form__field--image'
            onClick={this.openPopup}
          />
        : <div
            key='placeholder'
            className='form__field form__field--image placeholder'
            onClick={this.openPopup}
          >Choose image</div>
    ]);
  }
}

ImageUploader.propTypes = {
  input: PropTypes.object,
};

export default ImageUploader;
