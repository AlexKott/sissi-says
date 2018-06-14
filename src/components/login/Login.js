import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate, getTranslate } from 'react-localize-redux';

import * as actions from '@/actions/creators';

import Form from '@/components/form/Form';

const mapStateToProps = (state) => {
  const translate = getTranslate(state.localize);
  const loginFields = [
    {
      username: {
        label: translate('username'),
        type: 'string',
      },
    },
    {
      password: {
        label: translate('password'),
        type: 'password',
      },
    },
  ];

  return {
    loginFields,
    translate,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (e) => {
    e.preventDefault();
    dispatch(actions.login());
  },
});

const Login = ({ loginFields, onLogin, translate }) => (
  <div className='login'>
    <h1><Translate id='welcome' /></h1>
    <p><Translate id='loginPrompt' /></p>
    <Form
      form='login'
      fields={loginFields}
      submitText={translate('login')}
      onSubmit={onLogin}
    />
  </div>
);

Login.propTypes = {
  loginFields: PropTypes.array,
  onLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
