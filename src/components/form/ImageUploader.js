import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import ImagePopup from './ImagePopup';

const mapStateToProps = (state) => ({
  images: selectors.getAllImages(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOpenPopup: () => dispatch(actions.fetchData('images')),
});

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
    this.props.onOpenPopup();
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
      images = [],
    } = this.props;

    return ([
      this.state.isPopupActive && <ImagePopup
        key='image-popup'
        images={images}
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
  images: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
