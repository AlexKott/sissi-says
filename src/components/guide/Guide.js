import React from 'react';
import PropTypes from 'prop-types';

import Sissi from '@/components/svgs/Sissi';

const Guide = ({ isGuideOpen, onCloseGuide }) => ([
  isGuideOpen && <div onClick={onCloseGuide}>
    The guide.
  </div>
  ,
  <div key='guide-button' className='guide__button'>
    <Sissi />
  </div>
]);

Guide.propTypes = {
  isGuideOpen: PropTypes.bool,
  onCloseGuide: PropTypes.func,
};

export default Guide;
