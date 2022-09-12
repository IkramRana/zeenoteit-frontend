import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import useAuth from 'hooks/useAuth';

// *Import Components
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import ResetPassword from 'pages/auth/reset-password';
import ForgotPassword from 'pages/auth/forgot-password';
import Verification from 'pages/auth/verification';
import MyMissions from 'pages/missions/my-missions';
import MyThoughts from 'pages/thoughts/my-thoughts';
import WriteThought from 'pages/thoughts/write-thought';
import ReadThought from 'pages/thoughts/read-thought';
import EditThought from 'pages/thoughts/edit-thought';
import Settings from 'pages/settings/settings';
import Payment from 'pages/auth/payment';

const AppRoutes = () => {

  const auth = useAuth();

  useEffect(() => {
    auth.verifyToken();
  }, [])

  return (

    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact ><Login /></PublicRoute>
        <PublicRoute path="/login" exact ><Login /></PublicRoute>
        <PublicRoute path="/register" exact ><Register /></PublicRoute>
        <PublicRoute path="/reset-password/:userId/:token" exact ><ResetPassword /></PublicRoute>
        <PublicRoute path="/verification" exact ><Verification /></PublicRoute>
        <PublicRoute path="/forgot-password" exact ><ForgotPassword /></PublicRoute>

        <PrivateRoute path="/my-missions" exact ><MyMissions /></PrivateRoute>
        <PrivateRoute path="/my-thoughts" exact ><MyThoughts /></PrivateRoute>
        <PrivateRoute path="/write-thought" exact ><WriteThought /></PrivateRoute>
        <PrivateRoute path="/readmore/:id" exact ><ReadThought /></PrivateRoute>
        <PrivateRoute path="/edit-thought/:id" exact ><EditThought /></PrivateRoute>
        <PrivateRoute path="/settings" exact ><Settings /></PrivateRoute>
        <PrivateRoute path="/payment" exact ><Payment /></PrivateRoute>
      </Switch>
    </BrowserRouter >

  );
}

export default AppRoutes;