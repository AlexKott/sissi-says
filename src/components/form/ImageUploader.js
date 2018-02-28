import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';
import * as c from '@/constants';

const mapStateToProps = (state) => ({
  images: selectors.getAllImages(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUploadImage: (e) => {
    const validTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/tiff',
      'image/webp',
    ];
    const image = e.target.files[0];

    if (validTypes.indexOf(image.type) === -1) {
      return dispatch(actions.setAlert(c.ERROR_IMAGE_TYPE, 'error'));
    } else if (image.size > 500000) {
      return dispatch(actions.setAlert(c.ERROR_IMAGE_SIZE, 'error'));
    }
    dispatch(actions.saveImage(image));
  },
  onOpenPopup: () => dispatch(actions.fetchData('images')),
});

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupActive: false,
    };
  }

  openPopup() {
    console.log('open');
    this.setState(() => ({ isPopupActive: true }));
    this.props.onOpenPopup();
  }

  closePopup(e) {
    console.log('close');
    if (e.target.id === 'image-popup') {
      this.setState(() => ({ isPopupActive: false }));
    }
  }

  openFileBrowser() {
    console.log('files');
    if (!this.fileBrowser) {
      this.fileBrowser = document.createElement('input');
      this.fileBrowser.type = 'file';
      this.fileBrowser.accept = 'image/*';
      this.fileBrowser.style.display = 'none';
      document.querySelector('body').append(this.fileBrowser);
      this.fileBrowser.addEventListener('change', this.props.onUploadImage);
    }
    this.fileBrowser.click();
  }

  selectImage(image) {
    console.log('image');
    this.props.input.onChange(image);
    this.setState(() => ({ isPopupActive: false }));
  }

  render() {
    const {
      input,
      images = [],
    } = this.props;

    return ([
      this.state.isPopupActive && <div
        key='image-popup'
        id='image-popup'
        className='image-popup__wrapper'
        onClick={this.closePopup.bind(this)}
      >
        <div className='image-popup__box'>
          {images.map(image => (
            <div
              key={image}
              style={{ backgroundImage: `url('/images/${image}')` }}
              className='image-popup__image'
              onClick={this.selectImage.bind(this, image)}
            />
          ))}
          <div
            id='file-browser-button'
            className='image-popup__image placeholder'
            onClick={this.openFileBrowser.bind(this)}
          >Upload new image</div>
        </div>
      </div>
      ,
      input.value
        ? <div
            key='image'
            style={{ backgroundImage: `url('/images/${input.value}')` }}
            className='form__field form__field--image'
            onClick={this.openPopup.bind(this)}
          />
        : <div
            key='placeholder'
            className='form__field form__field--image placeholder'
            onClick={this.openPopup.bind(this)}
          >Choose image</div>
    ]);
  }
}

ImageUploader.propTypes = {
  input: PropTypes.object,
  images: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
