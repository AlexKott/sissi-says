import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import * as selectors from '@/selectors';
import * as tr from '@/translations';

import Form from '@/components/form/Form';

const mapStateToProps = state => ({
  ...selectors.getPropsForEditor(state),
});

const Editor = ({
  canDelete,
  fieldNames,
  formName,
  initialValues,
  viewLevel,
  onDelete,
}) => (
  <section className={`editor editor--level-${viewLevel}`}>
    <h1 className='editor__title'><Translate id={tr.EDITOR_TITLE} /></h1>
    {/* Do not remove the form key! */}
    <Form
      key={formName}
      fieldNames={fieldNames}
      form={formName}
      initialValues={initialValues}
    />
    {canDelete && <button type='button' onClick={onDelete} className='button'>
      <Translate id={tr.DELETE} />
    </button>}
  </section>
);

Editor.propTypes = {
  canDelete: PropTypes.bool,
  fieldNames: PropTypes.array,
  formName: PropTypes.string,
  initialValues: PropTypes.object,
  level: PropTypes.number,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps)(Editor);
