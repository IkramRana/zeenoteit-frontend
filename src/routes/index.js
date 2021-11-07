import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import ResetPassword from 'pages/auth/reset-password';
import ForgotPassword from 'pages/auth/forgot-password';
import Verification from 'pages/auth/verification';
import MyMissions from 'pages/missions/my-missions';
import MyThoughts from 'pages/thoughts/my-thoughts';
import WriteThoughts from 'pages/thoughts/write-thoughts';
import Settings from 'pages/settings/settings';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

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
        <PrivateRoute path="/write-thoughts" exact ><WriteThoughts /></PrivateRoute>
        <PrivateRoute path="/settings" exact ><Settings /></PrivateRoute>
      </Switch>
    </BrowserRouter >

  );
}

export default AppRoutes;