import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '@/selectors';
import * as actions from '@/actions';
import * as c from '@/constants';
import * as tr from '@/translations';

const mapStateToProps = (state) => ({
  images: selectors.getAllImages(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUploadImage: (e) => {
    const image = e.target.files[0];

    if (c.validImageTypes.indexOf(image.type) === -1) {
      return dispatch(actions.setAlert(c.ERROR, tr.ERROR_IMAGE_TYPE));
    } else if (image.size > c.maxImageSize) {
      return dispatch(actions.setAlert(c.ERROR, tr.ERROR_IMAGE_SIZE));
    }
    dispatch(actions.saveImage(image));
  },
});

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
    this.openFileBrowser = this.openFileBrowser.bind(this);
  }

  openFileBrowser(e) {
    e.stopPropagation();
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
      document.querySelector('body').removeChild(this.fileBrowser);
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
        className='popup__wrapper'
        onClick={onClosePopup}
      >
        <div className='popup__box'>
          {images.map(image => (
            <div
              key={image}
              style={{ backgroundImage: `url('/images/${image}')` }}
              className='image-popup__image'
              onClick={(e) => onSelectImage(e, image)}
            />
          ))}
          <div
            id='file-browser-button'
            className='image-popup__image placeholder'
            onClick={this.openFileBrowser}
          ><Translate id={tr.IMAGE_UPLOAD} /></div>
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
