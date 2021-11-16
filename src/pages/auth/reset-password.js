import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";

import { Lock, Logo } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Grid, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

  const history = useHistory();

  // *get param value
  const { userId, token } = useParams();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation 
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  // *For Reset Password
  const reset = async (data) => {
    setLoader(true)
    try {
      let obj = {
        userId: userId,
        token: token,
        password: data.password,
      }
      const { message } = await Service.resetPassword(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      history.push('/login');
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
            <form onSubmit={handleSubmit(reset)}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Reset Password</Typography>
                  <div className="input-field">
                    <div className="icon">
                      <Lock />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters"
                        }
                      })}
                    />
                  </div>
                  {errors?.password?.message && (
                    <p className="error">{errors?.password?.message}</p>
                  )}
                  <div className="input-field">
                    <div className="icon">
                      <Lock />
                    </div>
                    <input
                      type="password"
                      placeholder="Re-Password"
                      {...register("confirmPassword", {
                        required: 'Confirm password is required',
                        validate: value =>
                          value === password.current || "Confirm password does not match"
                      })}
                    />
                  </div>
                  {errors?.confirmPassword?.message && (
                    <p className="error">{errors?.confirmPassword?.message}</p>
                  )}
                  <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >Reset</button>
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