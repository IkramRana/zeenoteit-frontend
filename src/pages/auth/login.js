import React, { useEffect, useState } from 'react';
import Images from '../../assets/images';

import { disabledInspect } from '../../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';

function Login() {

  // *For Login
  const [form, setForm] = useState({
    userName: '',
    password: ''
  })

  const formHandler = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
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
                    <input type="text" name="userName" onChange={formHandler('userName')} placeholder="Username" autocomplete="off" required />
                  </div>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="password" onChange={formHandler('password')} placeholder="Password" autocomplete="off" required />
                  </div>
                  <button className="button">LOGIN</button>
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