import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Images from '../../assets/images';
import { disabledInspect, emailRegex } from '../../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Service } from "../../config/service";

function Login() {

  const history = useHistory();

  // *For Login
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const formHandler = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  }

  // *For Login
  const login = async () => {
    try {
      if (form.email === '') {
        return;
      } else {
        if (form.email.match(emailRegex)) {
          history.push('/login');
          resetForm();
        } else {
          return;
        }
      }
    } catch (error) {
      resetForm();
      console.log('Login -> error', error);
    }
  };

  // *For Reset Form
  const resetForm = () => {
    setForm({
      email: '',
      password: ''
    });
  }

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div className='bg'>
      <div className="form-wrapper">
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item md={12} >
            <img src={Images.logo} alt="zeNoteit" width="200" />
          </Grid>

          <Grid item md={12}>
            <form method="POST">
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Login</Typography>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.user} alt="user" />
                    </div>
                    <input type="email" name="email" onChange={formHandler('email')} placeholder="Email" autoComplete="off" required />
                  </div>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="password" onChange={formHandler('password')} placeholder="Password" autoComplete="off" required />
                  </div>
                  <button type="button" className="button" onClick={() => { login() }}>LOGIN</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-left" component="p">
              <Link href="/forgot-password">Forgot Password</Link>
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-right" component="p">
              <Link href="/register">Don't have an account? Signup</Link>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Login;