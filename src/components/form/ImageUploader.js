import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  onChooseImage: (e) => {
    console.log(e.target.files[0]);
  },
});

const ImageUploader = ({ input, onChooseImage }) => (
  input.value
    ? <div
        style={{ backgroundImage: `url('/images/${input.value}')` }}
        className='form__field form__field--image'
      />
    : <button className='form__field form__field--image placeholder'>Choose image</button>

);

ImageUploader.propTypes = {
  input: PropTypes.object,
  onChooseImage: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(ImageUploader);
