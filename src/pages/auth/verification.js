import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Images from '../../assets/images';
import { disabledInspect } from '../../utils/index';

import { Grid, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { firebase, auth } from '../../config/firebase';
import { Service } from "../../config/service";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var inputField = 1;
var value;

function Verification() {

  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [final, setfinal] = React.useState('');

  // *For Phone Verification
  const [form, setForm] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: ''
  })

  const getRegistrationValue = () => {
    value = JSON.parse(localStorage.getItem('regD'));
    setEmail(value.email);
    setNumber(value.phone);
    setPassword(value.password);
    sendOTP();
  }

  const formHandler = (prop) => (event) => {
    try {
      if (event.target.value.length <= 1) {
        if (event.target.value.length === 1) {
          if(inputField === 6){
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
      //console.log('file: verification.js => line 74 => formHandler => error', error);
    }
  }

  // Sent OTP
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
    const verify = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(number, verify).then((result) => {
      setfinal(result);
    }).catch((error) => {
      //alert(err);
      //window.location.reload()
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

  // Validate OTP
  const ValidateOtp = async () => {
    var otp;
    if (inputField === 6) {
      otp = form.input1 + form.input2 + form.input3 + form.input4 + form.input5 + form.input6;
    } else {
      return;
    }
    console.log('file: verification.js => line 101 => final.confirm => otp', otp);
    if (otp === null || final === null)
      return;
    final.confirm(otp).then((result) => {
      // success
      registerUser()
    }).catch((error) => {
      //alert(err.message);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    })
  }

  const registerUser = async () => {
    try {
      let obj = {
        email: email,
        password: password,
        phone_number: number,
        isNumberVerified: true,
      }
      const { status } = await Service.register(obj);
      if (status) {
        localStorage.removeItem('regD')
        //alert('Registration Successful')
        toast.success('Registration Successful', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        history.push('/login');
        resetForm();
      } else {
        //alert('Something Went Wrong')
        toast.error('Something Went Wrong', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log('file: verification.js => line 112 => registerUser => error', error);
    }
  }

  // *For Reset Form
  const resetForm = () => {
    setForm({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: ''
    });
  }

  useEffect(() => {
    getRegistrationValue();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div className='form-bg'>
      <div className="form-wrapper">
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item md={12} >
            <img src={Images.logo} alt="zeeNoteit" width="200" />
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
            <form method="post">
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Phone Number Verification</Typography>
                  <div>
                    <input type="number" className="verification-input" name="input1" value={form.input1} onChange={formHandler('input1')} autoComplete="off" required />
                    <input type="number" className="verification-input" name="input2" value={form.input2} onChange={formHandler('input2')} autoComplete="off" required />
                    <input type="number" className="verification-input" name="input3" value={form.input3} onChange={formHandler('input3')} autoComplete="off" required />
                    <input type="number" className="verification-input" name="input4" value={form.input4} onChange={formHandler('input4')} autoComplete="off" required />
                    <input type="number" className="verification-input" name="input5" value={form.input5} onChange={formHandler('input5')} autoComplete="off" required />
                    <input type="number" className="verification-input" name="input6" value={form.input6} onChange={formHandler('input6')} autoComplete="off" required />
                  </div>
                  <Typography component="p">
                    Please check your phone to get verification code.
                  </Typography>
                  <button type="button" className="button" onClick={() => { ValidateOtp() }}>VERIFY</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={12}>
            <Typography component="p">
              <span onClick={sendOTP}><Refresh /> Resend Code</span>
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