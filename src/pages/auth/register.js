import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Images from '../../assets/images';
import { disabledInspect, emailRegex } from '../../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';

function Register() {

  const history = useHistory();

  // *For Registration
  const [form, setForm] = useState({
    email: '',
    password: '',
    cPassword: '',
    phone: ''
  })

  const formHandler = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  }

  // *For Registration
  const signUp = async () => {
    try {
      if (form.email === '') {
        return;
      } else {
        if (form.email.match(emailRegex)) {
          history.push('/verification');
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
      password: '',
      cPassword: '',
      phone: ''
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
                  <Typography variant="h2">Register</Typography>
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
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="cPassword" onChange={formHandler('cPassword')} placeholder="Re-Password" autoComplete="off" required />
                  </div>
                  <div className="input-field">
                    <select name="country">
                      <option style={{ backgroundImage: `url(${Images.pak})`, }} value="+92"></option>
                    </select>
                    <input type="tel" name="phone" onChange={formHandler('phone')} placeholder="Phone No." autoComplete="off" required />
                  </div>
                  <button type="button" className="button" onClick={() => { signUp() }}>SIGNUP</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={12}>
            <Typography component="p" >
              <Link href="/login">Already have an account? Login</Link>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Register;