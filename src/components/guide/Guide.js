import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import Sissi from '@/components/svgs/Sissi';

const mapStateToProps = (state) => ({
  isGuideOpen: selectors.getDisplayGuidePopup(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOpenGuide: () => dispatch(actions.displayPopup('guide', true)),
  onCloseGuide: (e) => {
    if (e.target.id === 'guide-popup') {
      dispatch(actions.displayPopup('guide', false));
    }
  },
});

const Guide = ({ isGuideOpen, onOpenGuide, onCloseGuide }) => ([
  isGuideOpen && <div key='guide__wrapper' id='guide-popup' onClick={onCloseGuide}>
    The guide.
  </div>
  ,
  <div key='guide-button' className='guide__button' onClick={onOpenGuide}>
    <Sissi />
  </div>
]);

Guide.propTypes = {
  isGuideOpen: PropTypes.bool,
  onCloseGuide: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Guide);
