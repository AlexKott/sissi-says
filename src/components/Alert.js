import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '@/selectors';
import * as actions from '@/actions/creators';
import * as tr from '@/translations';

const mapStateToProps = state => ({
  ...selectors.getPropsForAlert(state),
});

const mapDispatchToProps = (dispatch) => ({
  onConfirm: () => dispatch(actions.clearAlerts()),
});

const Alert = ({
  allowConfirm,
  message,
  title,
  type,
  onConfirm,
}) => type && (
  <aside className='modal'>
    <article className={`modal__box modal__box--${type}`}>
      <h2 className='modal__title'><Translate id={title} /></h2>
      <p className='modal__message'><Translate id={message} /></p>
      {allowConfirm && <button className={`modal__button modal__button--${type}`} onClick={onConfirm}>
        <Translate id={tr.OK} />
      </button>}
    </article>
  </aside>
);

Alert.propTypes = {
  allowConfirm: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
