import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import FormFieldBuilder from './FormFieldBuilder';

const mapStateToProps = (state, ownProps) => {
  const selectedSection = selectors.getSelectedSectionId(state);
  return {
    canAddItem: selectors.getCanAddListItem(state, selectedSection, ownProps.listName),
    canDeleteItem: selectors.getCanDeleteListItem(state, selectedSection, ownProps.listName),
    nestedFields: ownProps.fieldStructure.fields.map(fieldName => {
      return selectors.getFieldByName(state, fieldName);
    }),
    selectedSection,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (sectionId, listName) => dispatch(actions.addListItem(sectionId, listName)),
  onDeleteItem: (sectionId, listName, itemIndex) => dispatch(actions.deleteListItem(sectionId, listName, itemIndex)),
});

const FlexList = ({
  canAddItem,
  canDeleteItem,
  fields: reduxFormFields,
  listName,
  fieldStructure,
  nestedFields,
  selectedSection,
  onAddItem,
  onDeleteItem,
}) => (
  <section>
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
        canDeleteItem && <button
          key={`delete-${index}`}
          type='button'
          onClick={() => onDeleteItem(selectedSection, listName, index)}
          className='button'
        >Delete</button>
      ]);
    })}
    {canAddItem && <button
      type='button'
      onClick={() => onAddItem(selectedSection, listName)}
      className='button'
    >+ {fieldStructure.itemLabel}</button>}
  </section>
);

FlexList.propTypes = {
  canAddItem: PropTypes.bool,
  canDeleteItem: PropTypes.bool,
  reduxFormFields: PropTypes.array,
  listName: PropTypes.string,
  fieldStructure: PropTypes.object,
  nestedFields: PropTypes.array,
  onAddItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlexList);
