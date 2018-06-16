import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate, getTranslate } from 'react-localize-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';
import * as tr from '@/translations';

const mapStateToProps = (state) => {
  const shouldDisplayModal = selectors.getShouldDisplayModal(state);
  const translate = getTranslate(state.localize);
  const alertMessage = selectors.getAlertMessage(state);
  const type = alertMessage.level ? translate(alertMessage.level) : translate(tr.LOADING);
  let className;

  if (alertMessage.level === tr.ERROR) {
    className = 'error';
  } else if (alertMessage.level === tr.SUCCESS) {
    className = 'success'
  }

  return {
    allowConfirm: alertMessage.level && alertMessage.text !== tr.ERROR_SERVER,
    boxClassName: `modal__box modal__box--${className}`,
    buttonClassName: `modal__button modal__button--${className}`,
    modalClassName: shouldDisplayModal ? 'modal' : 'modal modal--hidden',
    message: alertMessage.text ? translate(alertMessage.text) : translate(tr.LOADING_TEXT),
    type,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onConfirm: () => dispatch(actions.clearAlerts()),
});

const Modal = ({
  allowConfirm,
  boxClassName = 'modal__box',
  buttonClassName = 'modal__button',
  modalClassName = 'modal modal--hidden',
  message,
  type,
  onConfirm,
}) => (
  <aside className={modalClassName}>
    <article className={boxClassName}>
      <h2 className='modal__title'>{type}</h2>
      <p className='modal__message'>{message}</p>
      {allowConfirm && <button className={buttonClassName} onClick={onConfirm}>
        <Translate id={tr.OK} />
      </button>}
    </article>
  </aside>
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
