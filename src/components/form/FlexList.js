import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import FormFieldBuilder from './FormFieldBuilder';

const mapStateToProps = (state, ownProps) => ({
  selectedSection: selectors.getSelectedSectionId(state),
  nestedFields: ownProps.fieldStructure.fields.map(fieldName => {
    return selectors.getFieldByName(state, fieldName);
  }),
});

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (sectionId, listName) => dispatch(actions.addListItem(sectionId, listName)),
  onDeleteItem: (sectionId, listName, itemIndex) => dispatch(actions.deleteListItem(sectionId, listName, itemIndex)),
});

const FlexList = ({
  fields: reduxFormFields,
  listName,
  fieldStructure,
  nestedFields,
  selectedSection,
  onAddItem,
  onDeleteItem,
}) => (
  <div>
    <h3>{fieldStructure.label}</h3>
    {reduxFormFields.map((f, index) => {
      return ([
        nestedFields.map((field) => {
          const fieldName = Object.keys(field)[0];
          const fieldStructure = field[fieldName];
          return (<FormFieldBuilder
            key={fieldName}
            fieldName={`${f}.${fieldName}`}
            fieldStructure={fieldStructure}
          />);
        })
        ,
        <button
          key={`delete-${index}`}
          type='button'
          onClick={() => onDeleteItem(selectedSection, listName, index)}
          className='button'
        >Delete</button>
      ]);
    })}
    <button
      type='button'
      onClick={() => onAddItem(selectedSection, listName)}
      className='button'
    >+ {fieldStructure.itemLabel}</button>
  </div>
);

FlexList.propTypes = {
  reduxFormFields: PropTypes.array,
  listName: PropTypes.string,
  fieldStructure: PropTypes.object,
  nestedFields: PropTypes.array,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlexList);
