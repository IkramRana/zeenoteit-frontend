import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import resetPassword from '../pages/auth/reset-password'
import verification from '../pages/auth/verification'
import forgotPassword from '../pages/auth/forgot-password'

import Missions from '../pages/missions/my-missions';
import Thoughts from '../pages/thoughts/my-thoughts';
import WriteThoughts from '../pages/thoughts/write-thoughts';
import Settings from '../pages/settings/settings';

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Route component={Login} path="/" exact />
      <Route component={Login} path="/login" exact />
      <Route component={Register} path="/register" exact />
      <Route component={resetPassword} path="/reset-password" exact />
      <Route component={verification} path="/verification" exact />
      <Route component={forgotPassword} path="/forgot-password" exact />

      <Route component={Missions} path="/my-missions" exact />
      <Route component={Thoughts} path="/my-thoughts" exact />
      <Route component={WriteThoughts} path="/write-thoughts" exact />
      <Route component={Settings} path="/settings" exact />

    </BrowserRouter >

  );
}

export default AppRoutes;