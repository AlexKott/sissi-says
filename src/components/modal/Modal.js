import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

const mapStateToProps = (state) => {
  const shouldDisplayModal = selectors.getShouldDisplayModal(state);
  const alertMessage = selectors.getAlertMessage(state);
  const type = alertMessage.level || 'loading';
  let name = type;

  if (type.indexOf('error') !== -1) {
    name = 'error';
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
  <aside className={modalClassName}>
    <article className={boxClassName}>
      <h2 className='modal__title'>{name}</h2>
      <p className='modal__message'>{message}</p>
      {type !== 'server_error' && <button className={buttonClassName} onClick={onConfirm}>OK</button>}
    </article>
  </aside>
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
