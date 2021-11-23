import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";

import { Logo, User, Lock } from "assets/images/icons";
import { disabledInspect, emailRegex } from 'utils/index';
import { Service } from "config/service";

import { Grid, Typography } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Toaster from 'components/toaster';

function Register() {

  const history = useHistory();

  // *For Loader
  const [loader, setLoader] = useState(false)

  const [countryCode, setCountryCode] = useState('PK')

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  // *For Registration
  const signUp = async (data) => {
    setLoader(true)
    try {
      let obj = {
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
        countryCode: countryCode,
        phone: control._formValues.phoneInput
      };

      let userObj = {
        email: data.email,
        phone: control._formValues.phoneInput
      }

      const { status, message } = await Service.checkUserEmailAndPhone(userObj);
      localStorage.setItem('regD', JSON.stringify(obj));
      history.push('/verification');
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

          {/* ========== Toaster ========== */}
          <Toaster />

          <Grid item xs={12} sm={12} md={12} >
            <Logo />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <form onSubmit={handleSubmit(signUp)}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item sm={12} md={9}>
                  <Typography variant="h2">Register</Typography>
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
                  <div className="input-field">
                    <Controller
                      name="phoneInput"
                      control={control}
                      rules={{
                        required: 'Phone Number is required',
                        validate: (value) => isValidPhoneNumber(value) || 'Invalid phone number'
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          value={value}
                          onChange={onChange}
                          defaultCountry={countryCode}
                          country={countryCode}
                          onCountryChange={c => setCountryCode(c)}
                          id="phoneInput"
                        />
                      )}
                    />
                  </div>
                  {errors?.phoneInput?.message && (
                    <p className="error">{errors?.phoneInput?.message}</p>
                  )}
                  <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >SIGNUP</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography className="text-xs-center" component="p" onClick={() => history.push('/login')}>
              <span className="cursor-pointer">Already have an account? Login</span>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Register;