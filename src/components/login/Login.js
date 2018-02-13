import React from 'react';

import Form from '@/components/form/Form';

const loginFields = [
  {
    userName: {
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

const Login = () => (
  <div className='login'>
    <h1>Welcome to your Website Manager!</h1>
    <p>Please login to edit your website.</p>
    <Form
      form='login'
      fields={loginFields}
      submitText='Login'
      onSubmit={() => console.log('submitting')}
    />
  </div>
);

export default Login;
