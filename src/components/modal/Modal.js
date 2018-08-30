import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import * as tr from '@/translations';

const mapStateToProps = (state) => {
  const shouldDisplayModal = selectors.getShouldDisplayModal(state);
  const alertMessage = selectors.getAlertMessage(state);
  let classModifier = '';

  if (alertMessage.level === tr.ERROR) {
    classModifier = 'error';
  } else if (alertMessage.level === tr.SUCCESS) {
    classModifier = 'success'
  }

  return {
    allowConfirm: alertMessage.level !== '' && alertMessage.text !== tr.ERROR_SERVER,
    boxClassName: `modal__box modal__box--${classModifier}`,
    buttonClassName: `modal__button modal__button--${classModifier}`,
    message: alertMessage.text || tr.LOADING_TEXT,
    shouldDisplayModal,
    type: alertMessage.level || tr.LOADING,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onConfirm: () => dispatch(actions.clearAlerts()),
});

const Modal = ({
  allowConfirm,
  boxClassName,
  buttonClassName,
  message,
  shouldDisplayModal,
  type,
  onConfirm,
}) => shouldDisplayModal && (
  <aside className='modal'>
    <article className={boxClassName}>
      <h2 className='modal__title'><Translate id={type} /></h2>
      <p className='modal__message'><Translate id={message} /></p>
      {allowConfirm && <button className={buttonClassName} onClick={onConfirm}>
        <Translate id={tr.OK} />
      </button>}
    </article>
  </aside>
);

Modal.propTypes = {
  allowConfirm: PropTypes.bool,
  boxClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  message: PropTypes.string,
  shouldDisplayModal: PropTypes.bool,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
