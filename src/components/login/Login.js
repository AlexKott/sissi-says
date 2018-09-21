import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate, getTranslate } from 'react-localize-redux';

import * as actions from '@/actions';
import * as tr from '@/translations';

import Form from '@/components/form/Form';

const mapStateToProps = (state) => {
  const translate = getTranslate(state.localize);
  const loginFields = [
    {
      username: {
        label: translate(tr.USERNAME),
        type: 'string',
      },
    },
    {
      password: {
        label: translate(tr.PASSWORD),
        type: 'password',
      },
    },
  ];

  return {
    loginFields,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (e) => {
    e.preventDefault();
    dispatch(actions.login());
  },
});

const Login = ({ loginFields, onLogin }) => (
  <div className='login'>
    <h1><Translate id={tr.WELCOME} /></h1>
    <p><Translate id={tr.LOGIN_PROMPT} /></p>
    <Form
      form='login'
      fields={loginFields}
      submitText={tr.LOGIN}
      onSubmit={onLogin}
    />
  </div>
);

Login.propTypes = {
  loginFields: PropTypes.array,
  onLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
