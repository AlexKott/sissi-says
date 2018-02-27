import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

import Form from '@/components/form/Form';

const loginFields = [
  {
    username: {
      label: 'Nutzername',
      type: 'string',
    },
  },
  {
    password: {
      label: 'Passwort',
      type: 'password',
    },
  },
];

const mapDispatchToProps = (dispatch) => ({
  onLogin: (e) => {
    e.preventDefault();
    dispatch(actions.login());
  },
});

const Login = ({ onLogin }) => (
  <div className='login'>
    <h1>Welcome to your Website Manager!</h1>
    <p>Please login to edit your website.</p>
    <Form
      form='login'
      fields={loginFields}
      submitText='Login'
      onSubmit={onLogin}
    />
  </div>
);

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Login);
