import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import images from "assets/images/images";
import { disabledInspect, emailRegex } from 'utils/index';
import { Service } from "config/service";

import { Grid, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

var resendMail = '';

function ForgotPassword() {

  const history = useHistory();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Button Disabled
  const [buttonDisabled, setButtonDisabled] = useState(false)

  // *For Disabled
  const [disabled, setDisabled] = useState(true)

  // *For Resend Icon Animation
  const [iconAnimation, setIconAnimation] = useState(true)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Forgot Password Send Email
  const sendEmail = async (data) => {
    if (disabled === true) {
      setLoader(true)
      setButtonDisabled(true)
    } else {
      setLoader(false)
    }
    try {
      resendMail = data
      let obj = {
        email: data.email,
      }
      const { message } = await Service.getPasswordResetLink(obj);

      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setTimeout(() => {
        setDisabled(false);
      }, 10000);
      setIconAnimation(true)
    } catch (error) {
      setLoader(true)
      setButtonDisabled(false);
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

  // *For Resend Email
  const resendEmail = () => {
    if (disabled === true) {
      return
    } else {
      setIconAnimation(false);
      sendEmail(resendMail);
    }
  }

  // *For change Email
  const changeEmail = () => {
    setButtonDisabled(false)
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
            {images.logo}
          </Grid>

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

          <Grid item md={12}>
            <form onSubmit={handleSubmit(sendEmail)}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Forgot Password</Typography>
                  <div className="input-field">
                    <div className="icon">
                      {images.user}
                    </div>
                    <input
                      placeholder="Email Address"
                      {...register("email", {
                        required: 'Email is required',
                        pattern: {
                          value: emailRegex,
                          message: 'Please enter a valid email address',
                        }
                      })}
                      onChange={() => changeEmail()}
                    />
                  </div>
                  {errors?.email?.message && (
                    <p className="error">{errors?.email?.message}</p>
                  )}
                  <Typography component="p">
                    Please click on the link sent your email address to reset password.
                  </Typography>
                  <button type="submit" className={`button-raised ${buttonDisabled === true ? 'button-disabled ' : ''}`} disabled={buttonDisabled === true ? true : false} ><span className={loader === true ? 'spinner' : ''}></span>Send Email</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-left" component="p">
              <span className={`cursor-pointer ${disabled === true ? 'disabled ' : ''}`} onClick={() => { resendEmail() }}>
                <Refresh className={iconAnimation === true ? '' : 'resend'} /> Resend Email
              </span>
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography className="text-right" component="p" onClick={() => history.push('/login')}>
              <span className="cursor-pointer">Have an account? Login</span>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default ForgotPassword;