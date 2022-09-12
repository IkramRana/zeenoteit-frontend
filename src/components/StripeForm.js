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
import { Fragment } from 'react';

function StripeForm() {

  const history = useHistory();
  const auth = useAuth();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [stripePublicKey, setStripePublicKey] = useState('');
  const [selectType, setSelectType] = useState(1);
  const [thankyouScreen, setThankyouScreen] = useState(false);

  const newStripe = useStripe()
  const newElement = useElements()

  const styling = {
    style: {
      base: {
        fontSize: '14px',
        color: '#fff',
        padding: '5px',
        border: '2px solid red',
        '::placeholder': {
          color: 'rgba(255,255,255,0.5)',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }

  const paymentSubmission = async () => {
    setLoader(true)
    try {
      // e.preventDefault()
      let oldToken = localStorage.getItem('jwt')
      let obj = {}
      const { cs_key } = await Service.getSecretKey(oldToken);

      const { error: stripeError, paymentIntent } = await newStripe.confirmCardPayment(
        cs_key,
        {
          payment_method: {
            card: newElement.getElement(CardNumberElement),
          }
        }
      )
      if (stripeError) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(stripeError.message);
        return;
      }
      if (paymentIntent.status === 'succeeded') {
        const { status, token, plan_expiry, message } = await Service.subscription(obj, oldToken);
        if (status === true) {
          localStorage.setItem('jwt', token)
          localStorage.setItem('planExpiry', JSON.stringify(plan_expiry));
          auth.signin(token, true)
          setThankyouScreen(true)
        } else {
          toast.error(message, {
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
  }

  const navigate = async () => {
    setLoader(true)
    try {
      history.push('/my-missions');
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
  }


  return (
    <Fragment>
      {thankyouScreen ? (
        <form onSubmit={handleSubmit(navigate)}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item sm={12} md={9}>
              <Typography variant="h2">Registration Successful</Typography>
              <Box style={{ margin: '50px 0px' }}>
                <Typography variant="h2" style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Thank you</Typography>
                <Typography variant="h2" style={{ fontSize: '22px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 500 }}>for paying</Typography>
              </Box>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >OK</button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <form onSubmit={handleSubmit(paymentSubmission)}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item sm={12} md={9}>
              <Typography variant="h2">Pay With <Typography variant="h2" component="span" style={{ fontSize: '36px', fontFamily: "Rockness", color: '#003361' }}>Stripe</Typography></Typography>
              <div className="input-field" style={{ padding: '10px' }}>
                <CardNumberElement id="card-element" options={styling} />
              </div>
              <div className="input-field" style={{ padding: '10px' }}>
                <CardExpiryElement id="card-element" options={styling} />
              </div>
              <div className="input-field" style={{ padding: '10px' }}>
                <CardCvcElement id="card-element" options={styling} />
              </div>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >PAY NOW</button>
            </Grid>
          </Grid>
        </form>
      )}

    </Fragment>
  );
}

export default StripeForm;