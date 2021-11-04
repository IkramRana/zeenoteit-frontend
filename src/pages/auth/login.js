import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Images from '../../assets/images';
import { disabledInspect, emailRegex } from '../../utils/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { colors, darken, Grid, Typography } from '@material-ui/core';
import { Service } from "../../config/service";
import { ColorizeRounded } from '@material-ui/icons';

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
      if (form.email === '' || form.password === '') {
        return;
      } else {
        if (form.email.match(emailRegex)) {
          let obj = {
            email: form.email,
            password: form.password,
          }
          const { status, token } = await Service.login(obj);
          if (status) {
            localStorage.setItem('jwt', token)
            history.push('/my-missions');
            resetForm();
          }
        } else {
          return;
        }
      }
    } catch (error) {
      //alert(error)
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
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
    <div className='form-bg'>
      <div className="form-wrapper">

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          limit={1}
        />

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
            <Typography className="text-left cursor-pointer" component="p" onClick={() => history.push('/forgot-password')}>Forgot Password</Typography>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-right cursor-pointer" component="p" onClick={() => history.push('/register')}>Don't have an account? Signup</Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Login;