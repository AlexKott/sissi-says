import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  onChooseImage: (e) => {
    console.log(e.target.files[0]);
  },
});

const ImageUploader = ({ input, onChooseImage }) => [
  <input
    key='input'
    type='file'
    accept='.jpg, .jpeg, .png, .gif'
    onChange={onChooseImage}
  />
];

ImageUploader.propTypes = {
  input: PropTypes.object,
  onChooseImage: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(ImageUploader);
