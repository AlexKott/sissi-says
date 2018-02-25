import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

const mapStateToProps = (state) => {
  const shouldDisplayModal = selectors.getShouldDisplayModal(state);
  const alertMessage = selectors.getAlertMessage(state);
  const type = alertMessage.level || 'loading';
  let name;

  if (type === 'auth_error' || type === 'server_error') {
    console.log(type);
    name = 'error';
  } else {
    name = type;
  }

  return {
    boxClassName: `modal__box modal__box--${name}`,
    buttonClassName: `modal__button modal__button--${name}`,
    modalClassName: shouldDisplayModal ? 'modal' : 'modal modal--hidden',
    message: alertMessage.text || 'Magic is happening...',
    name,
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
  name,
  type,
  onConfirm,
}) => (
  <div className={modalClassName}>
    <div className={boxClassName}>
      <h2 className='modal__title'>{name}</h2>
      <p className='modal__message'>{message}</p>
      {type !== 'server_error' && <button className={buttonClassName} onClick={onConfirm}>OK</button>}
    </div>
  </div>
);

Modal.propTypes = {
  boxClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
