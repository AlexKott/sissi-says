import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

const mapStateToProps = (state) => {
  let message = 'Magic is happening...';
  let type = 'loading';
  const shouldDisplayModal = selectors.getShouldDisplayModal(state);
  const errorMessage = selectors.getErrorMessage(state);
  const alertMessage = selectors.getAlertMessage(state);

  if (errorMessage) {
    message = errorMessage;
    type = 'error';
  } else if (alertMessage) {
    message = alertMessage;
    type = 'success';
  }

  return {
    boxClassName: `modal__box modal__box--${type}`,
    buttonClassName: `modal__button modal__button--${type}`,
    modalClassName: shouldDisplayModal ? 'modal' : 'modal modal--hidden',
    message,
    type,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onConfirm: () => dispatch(actions.clearAlerts()),
});

const Modal = ({
  boxClassName = 'modal__box',
  buttonClassName = 'modal__button',
  modalClassName = 'modal modal--hidden',
  message,
  type,
  onConfirm,
}) => (
  <div className={modalClassName}>
    <div className={boxClassName}>
      <h2 className='modal__title'>{type}</h2>
      <p className='modal__message'>{message}</p>
      <button className={buttonClassName} onClick={onConfirm}>OK</button>
    </div>
  </div>
);

Modal.propTypes = {
  boxClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
