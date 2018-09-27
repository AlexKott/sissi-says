import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as C from '@/components';
import * as selectors from '@/selectors';
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
  trData,
  type,
  onConfirm,
}) => !!type && (
  <aside className='modal'>
    <article className={`modal__box modal__box--${type}`}>
      <h2 className='modal__title'><Translate id={title} /></h2>
      <p className='modal__message'><Translate id={message} data={trData} /></p>
      {allowConfirm && (
        <C.Button onClick={onConfirm} classes={`modal__button modal__button--${type}`}>
          <Translate id={tr.OK} />
        </C.Button>
      )}
    </article>
  </aside>
);

Alert.propTypes = {
  allowConfirm: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  trData: PropTypes.object,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
