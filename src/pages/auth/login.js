import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { Logo, User, Lock } from 'assets/images/icons';
import { disabledInspect, emailRegex } from 'utils/index';
import { Service } from "config/service";
import useAuth from 'hooks/useAuth';

import { Grid, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

  const history = useHistory();
  const auth = useAuth();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Login
  const login = async (data) => {
    setLoader(true)
    try {
      let obj = {
        email: data.email,
        password: data.password,
      }
      const { token, user } = await Service.login(obj);
      localStorage.setItem('jwt', token)
      localStorage.setItem('userData', JSON.stringify(user));
      auth.signin({ token })
      //window.location.href = "/my-missions";
      //setTimeout(() => {

      history.push('/my-missions');
      //window.location.href = '/my-missions';

      // let getToken = await localStorage.getItem('jwt');
      // console.log('file: login.js => line 43 => //setTimeout => getToken', getToken)
      // if (getToken) {
      //   console.log('if');
      //   setTimeout(() => {
      //     history.push('/my-missions');
      //   }, 30000);
      // } else {
      //   console.log('else');
      //   setInterval(() => {
      //     console.log('here')
      //     let getToken = localStorage.getItem('jwt');
      //     if (getToken) {
      //       setTimeout(() => {
      //         history.push('/my-missions');
      //       }, 30000);
      //     }
      //   }, 2000);
      // }
      //}, 60000);
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } finally {
      setLoader(false)
    }
  };

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div className='form-bg'>
      <div className="form-wrapper">
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          {/* ========== Alert Toaster ========== */}
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

          <Grid item md={12} >
            <Logo />
          </Grid>

          <Grid item md={12}>
            <form onSubmit={handleSubmit(login)}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Login</Typography>
                  <div className="input-field">
                    <div className="icon">
                      <User />
                    </div>
                    <input
                      placeholder="Email"
                      {...register("email", {
                        required: 'Email is required',
                        pattern: {
                          value: emailRegex,
                          message: 'Please enter a valid email address',
                        }
                      })}
                    />
                  </div>
                  {errors?.email?.message && (
                    <p className="error">{errors?.email?.message}</p>
                  )}
                  <div className="input-field">
                    <div className="icon">
                      <Lock />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: 'Password is required'
                      })}
                    />
                  </div>
                  {errors?.password?.message && (
                    <p className="error">{errors?.password?.message}</p>
                  )}
                  <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >LOGIN</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-left" component="p" onClick={() => history.push('/forgot-password')}>
              <span className="cursor-pointer">Forgot Password</span>
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-right" component="p" onClick={() => history.push('/register')}>
              <span className="cursor-pointer">Don't have an account? Signup</span>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Login;