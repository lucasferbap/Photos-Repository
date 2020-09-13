import React from 'react';
import { Switch } from 'react-router-dom';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

import Route from './Route';
import Album from '../pages/Album';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/signup" component={SingUp} />
      {/* <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} /> */}

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/album/:id" component={Album} isPrivate />
    </Switch>
  );
};

export default Routes;
