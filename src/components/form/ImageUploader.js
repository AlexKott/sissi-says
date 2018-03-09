import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import ImagePopup from './ImagePopup';

const mapStateToProps = (state) => ({
  isPopupActive: selectors.getDisplayImagePopup(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onOpenPopup: () => dispatch(actions.togglePopup('image', true)),
  onSelectImage: (image) => {
    ownProps.input.onChange(image);
    dispatch(actions.togglePopup('image', false));
  },
});

const ImageUploader = ({
  isPopupActive,
  input,
  onOpenPopup,
  onSelectImage,
}) => ([
  isPopupActive && <ImagePopup
    key='image-popup'
    onSelectImage={onSelectImage}
  />
  ,
  input.value
    ? <div
        key='image'
        style={{ backgroundImage: `url('/images/${input.value}')` }}
        className='form__field form__field--image'
        onClick={onOpenPopup}
      />
    : <div
        key='placeholder'
        className='form__field form__field--image placeholder'
        onClick={onOpenPopup}
      >Choose image</div>
]);

ImageUploader.propTypes = {
  isPopupActive: PropTypes.bool,
  input: PropTypes.object,
  onOpenPopup: PropTypes.func,
  onSelectImage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);
