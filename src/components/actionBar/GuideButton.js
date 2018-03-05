import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

import Sissi from '@/components/svgs/Sissi';

const mapDispatchToProps = (dispatch) => ({
  onOpenGuide: () => dispatch(actions.displayPopup('guide', true)),
});

const GuideButton = ({ onOpenGuide }) => (
  <button key='guide-button' type='button' className='guide__button' onClick={onOpenGuide}>
    <Sissi />
  </button>
);

GuideButton.propTypes = {
  onOpenGuide: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(GuideButton);
