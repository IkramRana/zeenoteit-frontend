import React, { useEffect, useState } from 'react';
import Images from '../../assets/images';

import { disabledInspect } from '../../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Service } from "../../config/service";

function Register() {

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

   // *Countries
   const getCountries = async () => {
    try {
      const { data } = await Service.getCountries();
      console.log('file: login.js => line 25 => getFonts => data', data);
    } catch (error) {
      console.log('Login -> error', error);
    }
  };

  useEffect(() => {
    disabledInspect();
    getCountries();
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
                    <input type="email" name="email" onChange={formHandler('email')} placeholder="Email" autocomplete="off" required />
                  </div>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="password" onChange={formHandler('password')} placeholder="Password" autocomplete="off" required />
                  </div>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="password" name="cPassword" onChange={formHandler('cPassword')} placeholder="Re-Password" autocomplete="off" required />
                  </div>
                  <div className="input-field">
                    <div className="icon">
                      <img src={Images.lock} alt="lock" />
                    </div>
                    <input type="tel" name="phone" onChange={formHandler('phone')} placeholder="Phone No." autocomplete="off" required />
                  </div>
                  <button className="button">SIGNUP</button>
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