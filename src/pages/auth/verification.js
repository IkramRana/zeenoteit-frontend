import React, { useEffect, useState } from 'react';
import Images from '../../assets/images';

import { disabledInspect } from '../../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

var inputField = 1;

function Verification() {

  // *For Phone Verification
  const [form, setForm] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  })

  const formHandler = (prop) => (event) => {
    if (event.target.value.length <= 1) {
      setForm({ ...form, [prop]: event.target.value });
      if (event.target.value >= 1) {
        if (inputField < 4) {
          event.target.nextSibling.focus();
          inputField += 1;
        } else {
          return;
        }
      } else {
        if (inputField <= 1) {
          return;
        } else {
          event.target.previousSibling.focus();
          inputField -= 1;
        }
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div className='bg'>
      <div className="form-wrapper">
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item md={12} >
            <img src={Images.logo} alt="zeNoteit" width="200" />
          </Grid>

          <Grid item md={12}>
            <form method="post">
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={9}>
                  <Typography variant="h2">Phone Number Verification</Typography>
                  <div>
                    <input type="number" className="verification-input" name="input1" onChange={formHandler('input1')} autocomplete="off" required />
                    <input type="number" className="verification-input" name="input2" onChange={formHandler('input2')} autocomplete="off" required />
                    <input type="number" className="verification-input" name="input3" onChange={formHandler('input3')} autocomplete="off" required />
                    <input type="number" className="verification-input" name="input4" onChange={formHandler('input4')} autocomplete="off" required />
                    <input type="number" className="verification-input" name="input5" onChange={formHandler('input5')} autocomplete="off" required />
                    <input type="number" className="verification-input" name="input6" onChange={formHandler('input6')} autocomplete="off" required />
                  </div>
                  <Typography component="p">
                    Please check your phone to get verification code.
                  </Typography>
                  <button className="button">VERIFY</button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item md={12}>
            <Typography component="p">
              <Link href="/verification"><Refresh /> Resend Code</Link>
            </Typography>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}

export default Verification;