import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as C from '@/components';
import * as selectors from '@/selectors';
import * as k from '@/constants/keywords';
import * as tr from '@/translations';

const mapStateToProps = (state) => {
  const pageId = selectors.getActivePageId(state);
  return {
    isTypePickerOpen: selectors.getModalType(state) === k.TYPE_PICKER,
    allowedTypes: pageId
      ? selectors.getAllowedSectionTypesForPageId(pageId)(state)
      : selectors.getAllowedPageTypes(state),
    pageId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseTypePicker: () => dispatch(actions.closeModal()),
  onSelectType: (pageId, type) => {
    if (pageId) {
      dispatch(actions.addSection(pageId, type));
    } else {
      dispatch(actions.addPage(type))
    }
    dispatch(actions.closeModal());
  }
});

const TypePicker = ({
  isTypePickerOpen,
  allowedTypes,
  pageId,
  onCloseTypePicker,
  onSelectType,
}) => isTypePickerOpen && (
  <C.Modal onClose={onCloseTypePicker} boxClasses='popup__box--guide'>
    <h2><Translate id={tr.TYPE_PICKER_TITLE} /></h2>
    {allowedTypes.map(type => (
      <C.Button key={type} onClick={() => onSelectType(pageId, type)}>
        <p>{type}</p>
      </C.Button>
    ))}
  </C.Modal>
);

TypePicker.propTypes = {
  isTypePickerOpen: PropTypes.bool,
  allowedTypes: PropTypes.array,
  pageId: PropTypes.string,
  onCloseTypePicker: PropTypes.func,
  onSelectType: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypePicker);
