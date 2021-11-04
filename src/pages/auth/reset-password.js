import React, { useEffect, useState } from 'react';
import { useHistory,useParams } from "react-router-dom";

import { Service } from "../../config/service";
import Images from '../../assets/images';
import { disabledInspect } from '../../utils/index';

import { Grid, Typography } from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

  const history = useHistory();

  // *get param value
  const { userId, token } = useParams();

  // *For Reset Password
  const [form, setForm] = useState({
    password: '',
    cPassword: ''
  })

  const formHandler = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  }

  // *For Reset Password
  const reset = async () => {
    try {
      let obj = {
        userId: userId,
        token: token,
        password: form.password,
      }
      const { status,message } = await Service.resetPassword(obj);
      if (status) {      
        //alert(message) 

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
        resetForm();
      }
    } catch (error) {
      resetForm();
      console.log('Login -> error', error);
    }
  };

  // *For Reset Form
  const resetForm = () => {
    setForm({
      password: '',
      cPassword: ''
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
                  <Typography variant="h2">Reset Password</Typography>
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
                  <button type="button" className="button" onClick={() => { reset() }}>Reset</button>
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