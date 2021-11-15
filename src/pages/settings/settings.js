import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ChangePassword, DeleteAccount, Email, LogoutSetting, NotifySetting, Reminder } from "assets/images/icons";
import { disabledInspect, emailRegex } from 'utils/index';
import { Service } from "config/service";
import useAuth from "hooks/useAuth";

import { Breadcrumbs, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import { toast } from "react-toastify";


let userData;
// var notify;

function Settings() {

  const history = useHistory();
  const { signout } = useAuth();

  const [phone, setPhone] = useState()
  const [countryCode, setCountryCode] = useState()
  const [openTime, setOpenTime] = useState()
  const [timeInterval, setTimeInterval] = useState('')
  const [notification, setNotification] = useState()

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  // *For onChange Email Validation
  const emailValidation = register("email", {
    required: 'Email is required',
    pattern: {
      value: emailRegex,
      message: 'Please enter a valid email address',
    }
  });

  // *For Save Button Hide
  const [button, setButton] = useState(false)

  // *Get User Data
  const getUserData = () => {
    try {
      userData = JSON.parse(localStorage.getItem('userData'));
      setPhone(userData[0].phone_number);
      setCountryCode(userData[0].countryCode);
      setOpenTime(userData[0].appSettings[0].dailyOpenTime);
      setTimeInterval(userData[0].appSettings[0].dailyTimeInterval);
      setNotification(userData[0].appSettings[0].isNotifyEnable);

      // *For Default Value
      setValue("email", userData[0].email);
      setValue("phoneInput", userData[0].phone_number);
      setValue("timeInterval", userData[0].dailyTimeInterval);
    } catch (error) {
      console.log('file: settings.js => line 22 => getUserData => error', error)
    }
  }

  // *For Notification
  const notifyHandler = (event) => {
    try {
      setNotification(event.target.checked)
      console.log('file: settings.js => line 65 => notifyHandler => setNotification', notification)
    } catch (error) {
      console.log('file: settings.js => line 65 => notifyHandler => error', error)
    }
  }

  // *Get Time Interval
  const getTimeInterval = (event) => {
    try {
      let timeInterval = event.target.value
      setTimeInterval(timeInterval)
    } catch (error) {
      console.log('file: settings.js => line 78 => getTimeInterval => error', error)
    }
  }

  // *For Update Setting
  const updateSetting = async (data) => {
    setLoader(true)
    try {
      let obj = {
        email: data.email,
        countryCode: countryCode,
        phone: control._formValues.phoneInput,
        time: data.timeInterval,
      }
      console.log('file: settings.js => line 87 => updateSetting => obj', obj)
      // const { message } = await Service.updateSetting(obj);
      // toast.success(message, {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: false,
      //   progress: undefined,
      // });
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

  // *For Save Button Hide & Show
  const saveButton = () => {
    try {
      setButton(true)
    } catch (error) {
      console.log('file: settings.js => line 127 => setSaveButton => error', error)
    }
  }

  useEffect(() => {
    getUserData();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Left Side ========== */}
      <Grid className="left-side" item md={2}>
        <Navigation />
      </Grid>

      {/* ========== Right Side ========== */}
      <Grid className="right-side" container spacing={0} item md={10}  >

        {/* ========== Header ========== */}
        <Grid item md={12}>
          <Header />
        </Grid>

        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Settings</Typography>
          </Breadcrumbs>

          {/* ========== Settings ========== */}
          <form onSubmit={handleSubmit(updateSetting)}>
            <Grid className="setting" container spacing={0} justifyContent="center" alignItems="stretch">

              {/* ========== Account ========== */}
              <Grid className="account" container spacing={0} item md={12} alignItems="flex-start">
                <Grid item md={12}>
                  <Typography className="heading">Account</Typography>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon">
                      <Email />
                    </div>
                    <div className="input-text">
                      <label>Email</label>
                      <input
                        type="text"
                        {...register("email", {
                          required: 'Email is required',
                          pattern: {
                            value: emailRegex,
                            message: 'Please enter a valid email address',
                          }
                        })}
                        onChange={(e) => { emailValidation.onChange(e); saveButton(e) }}
                      />
                    </div>
                  </div>
                  {errors?.email?.message && (
                    <p className="error">{errors?.email?.message}</p>
                  )}
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon">
                      <ChangePassword />
                    </div>
                    <div className="input-text">
                      <label>Password</label>
                      <input
                        type="password"
                        value='123456789'
                        disabled
                      />
                    </div>
                  </div>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="input-text" style={{ marginTop: '17px', }}>
                      <Controller
                        name="phoneInput"
                        control={control}
                        rules={{
                          required: 'Phone Number is required',
                          validate: (value) => isValidPhoneNumber(value) || 'Invalid phone number'
                        }}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            disabled
                            value={phone}
                            onChange={onChange}
                            defaultCountry={countryCode}
                            country={countryCode}
                            onCountryChange={c => setCountryCode(c)}
                            id="phoneInput"
                          />
                        )}
                      />
                    </div>
                  </div>
                  {errors?.phoneInput?.message && (
                    <p className="error">{errors?.phoneInput?.message}</p>
                  )}
                </Grid>
              </Grid>

              {/* ========== App Settings ========== */}
              <Grid className="app-setting" container spacing={0} item md={12} alignItems="flex-start">
                <Grid item md={12}>
                  <Typography className="heading">App Settings</Typography>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon">
                      <Reminder />
                    </div>
                    <div className="input-text">
                      <label>Daily Open Time</label>
                      <input
                        type="text"
                        defaultValue={openTime}
                        disabled
                      />
                    </div>
                  </div>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon">
                      <Reminder />
                    </div>
                    <div className="input-text">
                      <label>Daily Time Interval</label>
                      <FormControl >
                        <Select
                          value={timeInterval}
                          {...register("timeInterval")}
                          onChange={(e) => { getTimeInterval(e); saveButton() }}
                        >
                          <MenuItem value={30}>30 Min</MenuItem>
                          <MenuItem value={45}>45 Min</MenuItem>
                          <MenuItem value={1}>1 Hrs</MenuItem>
                          <MenuItem value={2}>2 Hrs</MenuItem>
                          <MenuItem value={3}>3 Hrs</MenuItem>
                          <MenuItem value={4}>4 Hrs</MenuItem>
                          <MenuItem value={5}>5 Hrs</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon align-icon">
                      <NotifySetting />
                    </div>
                    <div className="input-text">
                      <Typography component="p">Notification
                        <Controller
                          control={control}
                          name="active"
                          defaultValue={notification}
                          onChange={() => { saveButton() }}
                          render={({ field: { onChange, ref } }) => (
                            <Switch
                              value={notification}
                              inputRef={ref}
                              onChange={onChange}
                            />
                          )}
                        />
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>

              {/* ========== User Decision ========== */}
              <Grid className="user-decision" container spacing={0} item md={12} alignItems="flex-start">
                <Grid item md={12}>
                  <Typography className="heading">User Decision</Typography>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon align-icon">
                      <DeleteAccount />
                    </div>
                    <div className="input-text">
                      <Typography className="cursor-pointer" component="p">Delete My Account</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon align-icon">
                      <LogoutSetting />
                    </div>
                    <div className="input-text">
                      <Typography className="cursor-pointer" component="p" onClick={signout}>Logout</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>

              {/* ========== Save ========== */}
              <Grid item md={3}>
                {button &&
                  <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >Save</button>
                }
              </Grid>

            </Grid>
          </form>

        </Grid>

      </Grid>

    </Grid>
  );
}

export default Settings;