import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions';
import * as C from '@/components';
import * as selectors from '@/selectors';

const mapStateToProps = (state) => ({
  isGuideOpen: selectors.getModalType(state) === 'guide',
});

const mapDispatchToProps = (dispatch) => ({
  onCloseGuide: (e) => {
    if (e.target.id === 'guide-popup') {
      dispatch(actions.closeModal());
    }
  },
});

const Guide = ({ isGuideOpen, onCloseGuide }) => (
  isGuideOpen && <aside
    id='guide-popup'
    className='popup__wrapper'
    onClick={onCloseGuide}
  >
    <article className='popup__box popup__box--guide'>
      <C.SissiSvg className='guide__sissi' />
      <C.GuideContent />
    </article>
  </aside>
);

Guide.propTypes = {
  isGuideOpen: PropTypes.bool,
  onCloseGuide: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
