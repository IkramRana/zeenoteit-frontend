import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Logo } from "assets/images/icons";
import { disabledInspect, lowerCase } from 'utils/index';
import { Service } from "config/service";
import { firebase, auth } from 'config/firebase';

import { Grid, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Toaster from 'components/toaster';

var inputField = 1;
var value;

function Verification() {

  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [countryCode, setCountryCode] = useState('')
  const [password, setPassword] = React.useState("");
  const [final, setFinal] = React.useState('');

  // *For Phone Verification
  const [form, setForm] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  })

  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Disabled
  const [disabled, setDisabled] = useState(true)

  // *For Resend Icon Animation
  const [iconAnimation, setIconAnimation] = useState(true)

  // *Get Registration Value
  const getRegistrationValue = () => {
    value = JSON.parse(localStorage.getItem('regD'));
    setEmail(value.email);
    setNumber(value.phone);
    setCountryCode(value.countryCode);
    setPassword(value.password);
    sendOTP();
  }

  // *For Set Verification Code
  const formHandler = (prop) => (event) => {
    try {
      if (event.target.value.length <= 1) {
        if (event.target.value.length === 1) {
          if (inputField === 6) {
            setForm({ ...form, [prop]: event.target.value });
          }
          else if (inputField <= 6) {
            setForm({ ...form, [prop]: event.target.value });
            event.target.nextSibling.focus();
            inputField += 1;
          } else {
            return;
          }
        } else {
          if (inputField === 1) {
            setForm({ ...form, [prop]: event.target.value });
          } else {
            setForm({ ...form, [prop]: event.target.value });
            event.target.previousSibling.focus();
            inputField -= 1;
          }
        }
      } else {
        return;
      }
    } catch (error) {
      console.log('file: verification.js => line 81 => formHandler => error', error)
    }
  }

  // *Sent OTP
  const sendOTP = () => {
    const number = value.phone;
    if (number === "" || number.length < 10) return;

    //let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
    setTimeout(() => {
      setIconAnimation(true)
    }, 1000);
    const verify = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(number, verify).then((result) => {
      setFinal(result);
    }).catch((error) => {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    });

  }

  // *For Resend OTP
  const resendOTP = () => {
    if (disabled === true) {
      return
    } else {
      setIconAnimation(false);
      sendOTP();
    }
  }

  // *Validate OTP
  const ValidateOtp = async () => {
    setLoader(true)
    try {
      var otp;
      if (inputField === 6) {
        otp = form.input1 + form.input2 + form.input3 + form.input4 + form.input5 + form.input6;
      } else {
        toast.error('Please Enter Valid OTP', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        return;
      }
      if (otp === null || final === null)
        return;
      final.confirm(otp).then((result) => {
        // success
        registerUser()
      }).catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      })
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } finally {
      setTimeout(() => {
        setLoader(false)
      }, 1000);
    }
  }

  const registerUser = async () => {
    try {
      let obj = {
        email: lowerCase(email),
        password: password,
        country_code: countryCode,
        phone_number: number,
        isNumberVerified: true,
      }
      const { message } = await Service.register(obj);

      localStorage.removeItem('regD')
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
        history.push('/login');
      }, 1000);
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
    }
  }

  setTimeout(() => {
    setDisabled(false)
  }, 10000);

  useEffect(() => {
    getRegistrationValue();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [loader])

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
            <form onSubmit={handleSubmit(ValidateOtp)}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item sm={12} md={9}>
                  <Typography variant="h2">Phone Number Verification</Typography>
                  <div>
                    <input type="number" className="verification-input" name="input1" value={form.input1} onChange={formHandler('input1')} required />
                    <input type="number" className="verification-input" name="input2" value={form.input2} onChange={formHandler('input2')} required />
                    <input type="number" className="verification-input" name="input3" value={form.input3} onChange={formHandler('input3')} required />
                    <input type="number" className="verification-input" name="input4" value={form.input4} onChange={formHandler('input4')} required />
                    <input type="number" className="verification-input" name="input5" value={form.input5} onChange={formHandler('input5')} required />
                    <input type="number" className="verification-input" name="input6" value={form.input6} onChange={formHandler('input6')} required />
                  </div>
                  <Typography component="p">
                    Please check your phone to get verification code.
                  </Typography>
                  <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >VERIFY</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography className="text-xs-center" component="p">
              <span className={`cursor-pointer ${disabled === true ? 'disabled ' : ''}`} onClick={() => { resendOTP() }}>
                <Refresh className={iconAnimation === true ? '' : 'resend'} /> Resend Code
              </span>
              <button style={{ display: "none" }} id="sign-in-button"></button>
            </Typography>
          </Grid>

        </Grid>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default Verification;