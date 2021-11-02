import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Images from '../../assets/images';
import { disabledInspect } from '../../utils/index';

import { Grid, Typography } from '@material-ui/core';

function ResetPassword() {

  const history = useHistory();

  // *For Reset Password
  const [form, setForm] = useState({
    password: '',
    cPassword: ''
  })

  const formHandler = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  }

  // *For Reset Password
  const reset = async () => {
    try {
      history.push('/login');
      resetForm();
    } catch (error) {
      resetForm();
      console.log('Login -> error', error);
    }
  };

  // *For Reset Form
  const resetForm = () => {
    setForm({
      password: '',
      cPassword: ''
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
            <form method="post">
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Reset Password</Typography>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="password" onChange={formHandler('password')} placeholder="Password" autoComplete="off" required />
                  </div>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="cPassword" onChange={formHandler('cPassword')} placeholder="Re-Password" autoComplete="off" required />
                  </div>
                  <button type="button" className="button" onClick={() => { reset() }}>Reset</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default ResetPassword;