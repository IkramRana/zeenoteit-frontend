import React, { useEffect, useState } from 'react';
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

function SubscriptionForm({ changeType, freeTrail }) {

  // *For Loader
  const [loader, setLoader] = useState(false)

  const [selectPay, setSelectPay] = useState('pay');

  const selectPaymentType = async () => {
    try {
      if (selectPay === 'trial') {
        freeTrail()
      } else {
        changeType()
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

  return (
    <form>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item sm={12} md={9}>
          <Typography variant="h2"><Typography variant="h2" component="span" style={{ fontSize: '36px', fontFamily: "Rockness", color: '#003361' }}>Pay</Typography> With Peace Of Mind</Typography>
          <Box style={{ margin: '30px 0px' }}>
            <Box onClick={() => setSelectPay('pay')} className={`payment-select-box ${selectPay === 'pay' && 'selected-payment-box'}`}>
              <Typography variant="body1">Per Month</Typography>
              <Typography variant="body1" className='price'>$9.90</Typography>
              <Radio
                color='#003361'
                checked={selectPay === 'pay'}
                onChange={(e) => setSelectPay(e.target.value)}
                value="pay"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'pay' }}
              />
            </Box>
            <Box onClick={() => setSelectPay('trial')} className={`payment-select-box ${selectPay === 'trial' && 'selected-payment-box'}`}>
              <Typography variant="body1">14 Days</Typography>
              <Typography variant="body1" className='price'>Free Trial</Typography>
              <Radio
                color='#003361'
                checked={selectPay === 'trial'}
                onChange={(e) => setSelectPay(e.target.value)}
                value="trial"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'trial' }}
              />
            </Box>
          </Box>
          <button className={`button-raised`} onClick={() => selectPaymentType()}>Continue</button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SubscriptionForm;