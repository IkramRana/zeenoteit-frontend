import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { Logo, User, Lock } from 'assets/images/icons';
import { disabledInspect, emailRegex, lowerCase } from 'utils/index';
import { Service } from "config/service";
import useAuth from 'hooks/useAuth';

import { Box, Grid, Radio, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Toaster from 'components/toaster';
import { loadStripe } from '@stripe/stripe-js';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import StripeForm from 'components/StripeForm';

function Payment() {

  const history = useHistory();
  const auth = useAuth();

  const userData = JSON.parse(localStorage.getItem('userData'))
  const isTrialUsed = userData[0].trial_used

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { handleSubmit } = useForm();

  const [stripePublicKey, setStripePublicKey] = useState('');
  console.log('file: payment.js:35 => Payment => stripePublicKey', stripePublicKey)
  const [selectType, setSelectType] = useState(1);

  const [selectPay, setSelectPay] = useState('pay');

  const selectPaymentType = async () => {
    try {
      let oldToken = localStorage.getItem('jwt')
      let obj = {}
      if (selectPay === 'pay') {
        setSelectType(2)
      } else {
        if (isTrialUsed === true) return
        const { status, token, plan_expiry, plan_identifier } = await Service.freeTrial(obj, oldToken);
        if (status === true) {
          localStorage.setItem('jwt', token)
          localStorage.setItem('planExpiry', JSON.stringify(plan_expiry));
          localStorage.setItem('planIdentifier', JSON.stringify(plan_identifier));
          auth.signin(token)
          history.push('/my-missions');
        }
      }
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

  const getSecretKey = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { public_key } = await Service.getSecretKey(token);
      setStripePublicKey(public_key)
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

  useEffect(() => {
    disabledInspect()
    getSecretKey()
  }, []);


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
            {selectType === 1 ? (
              <form onSubmit={handleSubmit(selectPaymentType)}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                  <Grid item sm={12} md={9}>
                    {isTrialUsed ? (
                      <Fragment>
                        <Typography variant="h2" style={{ color: '#E83737' }}><Typography variant="h2" component="span" style={{ fontSize: '36px', fontFamily: "Rockness", color: '#003361' }}>Trial</Typography> Expired</Typography>
                        <Typography variant="body2" style={{ fontSize: '13px', color: '#646464' }}>Your 14 Days Free Trial has been expired, select your plan to enjoy our services</Typography>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Typography variant="h2"><Typography variant="h2" component="span" style={{ fontSize: '36px', fontFamily: "Rockness", color: '#003361' }}>Pay</Typography> With Peace Of Mind</Typography>
                        <Typography variant="body2" style={{ fontSize: '13px', color: '#646464' }}>Start using the app to get most out of your desire.</Typography>
                      </Fragment>
                    )}
                    <Box style={{ margin: '30px 0px' }}>
                      <Box onClick={() => setSelectPay('pay')} className={`payment-select-box ${selectPay === 'pay' && 'selected-payment-box'}`}>
                        <Typography variant="body1">Per Month</Typography>
                        <Typography variant="body1" className='price'>$9.90</Typography>
                        <Radio
                          color='#003361'
                          checked={selectPay === 'pay'}
                          value="pay"
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'pay' }}
                        />
                      </Box>
                      <Box onClick={() => isTrialUsed === false && setSelectPay('trial')} className={`payment-select-box ${selectPay === 'trial' && 'selected-payment-box'} ${isTrialUsed === true && 'selected-payment-box-disabled'}`}>
                        <Typography variant="body1">14 Days</Typography>
                        <Typography variant="body1" className='price'>Free Trial</Typography>
                        <Radio
                          color='#003361'
                          checked={selectPay === 'trial'}
                          // onChange={(e) => setSelectPay(e.target.value)}
                          value="trial"
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'trial' }}
                        />
                      </Box>
                    </Box>
                    <button type="submit" className={`button-raised`}>Continue</button>
                    <Typography variant="body2" style={{ fontSize: '13px', marginTop: '8px', color: '#fff' }}>By continuing you are agree to terms & conditions</Typography>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Elements stripe={loadStripe(stripePublicKey)}>
                <StripeForm />
              </Elements>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography className="text-xs-center" component="p" onClick={() => { auth.signout(); history.push('/login') }}>
              <span className="cursor-pointer">Change account</span>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Payment;