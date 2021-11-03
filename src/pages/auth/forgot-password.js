import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Images from '../../assets/images';
import { disabledInspect, emailRegex } from '../../utils/index';

import { Grid, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { Service } from "../../config/service";

function ForgotPassword() {

  const history = useHistory();

  // *Use State For Form Obj
  const [form, setForm] = useState({
    email: ''
  })

  const formHandler = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  }

  // *For Forgot Password
  const sendEmail = async () => {
    try {
      if (form.email === '') {
        return;
      } else {
        if (form.email.match(emailRegex)) {
          let obj = {
            email: form.email,
          }
          const { status,message } = await Service.getPasswordResetLink(obj);
          if (status) {       
            alert(message)
            window.location.reload();
            resetForm();
          }
        } else {
          return;
        }
      }
    } catch (error) {
      resetForm();
      console.log('Forgot Password -> error', error);
    }
  };

  // *For Reset Form
  const resetForm = () => {
    setForm({
      email: ''
    });
  }

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div className='form-bg'>
      <div className="form-wrapper">
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item md={12} >
            <img src={Images.logo} alt="zeNoteit" width="200" />
          </Grid>

          <Grid item md={12}>
            <form method="POST">
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Forgot Password</Typography>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.user} alt="user" />
                    </div>
                    <input type="email" name="email" onChange={formHandler('email')} placeholder="Email Address" autoComplete="off" required />
                  </div>
                  <Typography component="p">
                    Please click on the link sent your email address to reset password.
                  </Typography>
                  <button type="button" className="button" onClick={() => { sendEmail() }}>Send Email</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-left" component="p">
              <span onClick={() => { sendEmail() }}><Refresh /> Resend Email</span>
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-right cursor-pointer" component="p" onClick={() => history.push('/login')}>Have an account? Login</Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default ForgotPassword;