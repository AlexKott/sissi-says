import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions';
import * as C from '@/components';

const mapDispatchToProps = (dispatch) => ({
  onOpenGuide: () => dispatch(actions.setModalType('guide')),
});

const GuideButton = ({ onOpenGuide }) => (
  <button key='guide-button' type='button' className='guide-button' onClick={onOpenGuide}>
    <C.SissiSvg />
  </button>
);

GuideButton.propTypes = {
  onOpenGuide: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(GuideButton);
