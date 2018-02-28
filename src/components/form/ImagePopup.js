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
  onClosePopup: (e) => {
    if (e.target.id === 'image-popup') {
      dispatch(actions.displayPopup('image', false));
    }
  },
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
});

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
    this.openFileBrowser = this.openFileBrowser.bind(this);
  }

  openFileBrowser() {
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

  componentWillUnmount() {
    if (this.fileBrowser) {
      const parent = document.querySelector('body');
      parent.removeChild(this.fileBrowser);
    }
  }

  render() {
    const {
      images = [],
      onClosePopup,
      onSelectImage,
    } = this.props;

    return (
      <div
        id='image-popup'
        className='image-popup__wrapper'
        onClick={onClosePopup}
      >
        <div className='image-popup__box'>
          {images.map(image => (
            <div
              key={image}
              style={{ backgroundImage: `url('/images/${image}')` }}
              className='image-popup__image'
              onClick={() => onSelectImage(image)}
            />
          ))}
          <div
            id='file-browser-button'
            className='image-popup__image placeholder'
            onClick={this.openFileBrowser}
          >Upload new image</div>
        </div>
      </div>
    );
  }
}

ImagePopup.propTypes = {
  images: PropTypes.array,
  onClosePopup: PropTypes.func,
  onSelectImage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagePopup);
