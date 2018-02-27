import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

const mapStateToProps = (state) => ({
  images: selectors.getAllImages(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChooseImage: (e) => {
    console.log(e.target.files[0]);
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
    this.setState(() => ({ isPopupActive: true }));
    this.props.onOpenPopup();
  }

  closePopup(e) {
    if (e.target.id === 'image-popup') {
      this.setState(() => ({ isPopupActive: false }));
    }
  }

  render() {
    const {
      input,
      images = [],
      onChooseImage,
    } = this.props;

    if (this.state.isPopupActive) {
      return (
        <div id='image-popup' className='image-popup__wrapper' onClick={this.closePopup.bind(this)}>
          <div className='image-popup__box'>
            {images.map(image => (
              <div
                key={image}
                style={{ backgroundImage: `url('/images/${image}')` }}
                className='image-popup__image'
              />
            ))}
            <div className='image-popup__image placeholder'>Upload new image</div>
          </div>
        </div>
      );
    } else {
      return (
        input.value
          ? <div
              style={{ backgroundImage: `url('/images/${input.value}')` }}
              className='form__field form__field--image'
              onClick={this.openPopup.bind(this)}
            />
          : <div
              className='form__field form__field--image placeholder'
              onClick={this.openPopup.bind(this)}
            >Choose image</div>
      );
    }
  }
}

ImageUploader.propTypes = {
  input: PropTypes.object,
  images: PropTypes.array,
  onChooseImage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
