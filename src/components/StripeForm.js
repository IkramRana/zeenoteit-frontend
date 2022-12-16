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
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, Elements, PaymentElement, PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Fragment } from 'react';

function StripeForm() {

  const history = useHistory();
  const auth = useAuth();
  // const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

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
        toast.error(stripeError, {
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
      if (paymentIntent.status === 'succeeded') {
        const { status, token, plan_expiry, plan_identifier, message } = await Service.subscription(obj, oldToken);
        if (status === true) {
          localStorage.setItem('jwt', token)
          localStorage.setItem('planExpiry', JSON.stringify(plan_expiry));
          localStorage.setItem('planIdentifier', JSON.stringify(plan_identifier));
          auth.signin(token)
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

  useEffect(() => {
    let oldToken = localStorage.getItem('jwt')
    if (newStripe) {
      const pr = newStripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total Amount',
          amount: 9.90 * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          console.log('file: StripeForm.js:142 => pr.shiaryar => result', result)
          setPaymentRequest(pr);
        }
      });
      pr.on('paymentmethod', async (ev) => {
        const { cs_key } = await Service.getSecretKey(oldToken);

        const { error: stripeError, paymentIntent } = await newStripe.confirmCardPayment(
          cs_key,
          { payment_method: ev.paymentMethod.id },
        )
        if (stripeError) {
          toast.error(stripeError, {
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
        if (paymentIntent.status === 'succeeded') {
          const { status, token, plan_expiry, plan_identifier, message } = await Service.subscription({}, oldToken);
          if (status === true) {
            localStorage.setItem('jwt', token)
            localStorage.setItem('planExpiry', JSON.stringify(plan_expiry));
            localStorage.setItem('planIdentifier', JSON.stringify(plan_identifier));
            auth.signin(token)
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
      })
    }
  }, [newStripe]);

  return (
    <Fragment>
      {thankyouScreen ? (
        <form onSubmit={handleSubmit(navigate)}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item sm={12} md={9}>
              <Typography variant="h2">Registration Successful</Typography>
              <Box style={{ margin: '50px 0px' }}>
                <Typography variant="h2" style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 700 }}>Thank you</Typography>
                <Typography variant="h2" style={{ fontSize: '22px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 500 }}>for paying</Typography>
              </Box>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >OK</button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Fragment>
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
                {paymentRequest &&
                  <div style={{ marginTop: '14px' }}>
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                  </div>
                }
              </Grid>
            </Grid>
          </form>
        </Fragment>
      )}

    </Fragment>
  );
}

export default StripeForm;