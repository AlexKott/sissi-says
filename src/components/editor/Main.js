import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';
import * as actions from '@/actions/creators';

import Form from '@/components/form/Form';

const mapStateToProps = (state) => ({
  fields: selectors.getMetaFields(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSaveContent: (e) => {
    e.preventDefault();
    dispatch(actions.postData('content'));
  },
});

const Main = ({
  fields = [],
  onSaveContent,
}) => (
  <section className='editor'>
    <h1 className='editor__title'>Welcome to your Website Manager!</h1>
    <p className='editor__hint'>Enter some basic data here:</p>
    <Form form='meta' fields={fields} onSave={onSaveContent} />
    <p className='editor__hint'>Or get working on your pages by selecting one! (You can always get back here by deselecting the current page.)</p>
    <p className='editor__hint'>If you get stuck – sissi's always here to help!</p>
  </section>
);

Main.propTypes = {
  fields: PropTypes.array,
  onSaveContent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
