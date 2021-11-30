import React, { useEffect, useState } from "react";

import { ChangePassword, DeleteAccount, Email, LogoutSetting, NotifySetting, Phone, Reminder } from "assets/images/icons";
import { disabledInspect, emailRegex } from 'utils/index';
import { Service } from "config/service";
import useAuth from "hooks/useAuth";

import { Breadcrumbs, FormControl, Grid, MenuItem, Select, Switch, Typography } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import Deleted from "components/delete";
import Toaster from "components/toaster";

let userData;
var notify = Boolean;

function Settings() {

  const { signout } = useAuth();

  const [id, setId] = useState()
  const [phone, setPhone] = useState()
  const [countryCode, setCountryCode] = useState()
  const [openTime, setOpenTime] = useState()
  const [timeInterval, setTimeInterval] = useState('')

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  // *For onChange Email Validation
  const email = register("email", {
    required: 'Email is required',
    pattern: {
      value: emailRegex,
      message: 'Please enter a valid email address',
    }
  });

  // *For Delete Account
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false)

  // *For Save Button Hide
  const [button, setButton] = useState(false)

  // *Get User Data
  const getUserData = () => {
    try {
      userData = JSON.parse(localStorage.getItem('userData'));
      setId(userData[0]._id)
      setPhone(userData[0].phone_number);
      setCountryCode(userData[0].countryCode);
      setOpenTime(userData[0].appSettings[0].dailyOpenTime);
      setTimeInterval(userData[0].appSettings[0].dailyTimeInterval);
      notify = userData[0].appSettings[0].isNotifyEnable;

      // *For Default Value
      setValue("email", userData[0].email);
      setValue("phoneInput", userData[0].phone_number);
      setValue("openTime", userData[0].appSettings[0].dailyOpenTime);
      setValue("timeInterval", userData[0].appSettings[0].dailyTimeInterval);
      setValue("notification", userData[0].appSettings[0].isNotifyEnable);
    } catch (error) {
      console.log('file: settings.js => line 22 => getUserData => error', error)
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
      let token = localStorage.getItem('jwt')
      let obj = {};
      if(data.password){
        obj = {
          email: data.email,
          password: data.password,
          countryCode: countryCode,
          phoneNumber: control._formValues.phoneInput,
          dailyOpenTime: data.openTime,
          dailyTimeInterval: data.timeInterval,
          isNotifyEnable: data.notification
        }
      } else {
        obj = {
          email: data.email,
          countryCode: countryCode,
          phoneNumber: control._formValues.phoneInput,
          dailyOpenTime: data.openTime,
          dailyTimeInterval: data.timeInterval,
          isNotifyEnable: data.notification
        }
      }
      notify = obj.isNotifyEnable
      setValue("notification", obj.isNotifyEnable)
      const { message } = await Service.updateSetting(obj, token);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
      let updateUserData = [{
        appSettings: [{
          dailyOpenTime: obj.dailyOpenTime,
          dailyTimeInterval: obj.dailyTimeInterval,
          isNotifyEnable: obj.isNotifyEnable,
        }],
        _id: id, 
        email: obj.email,
        countryCode: obj.countryCode,
        phone_number: obj.phoneNumber,
      }]
      localStorage.setItem('userData', JSON.stringify(updateUserData))
      getUserData()
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

  // *For Delete Account Open and Close Dialog
  const deleteAccountDialog = (type) => {
    if (type === true) {
      setOpenDeleteAccount(true);
    } else {
      setOpenDeleteAccount(false);
    }
  }

  // *For Delete Account
  const deleteAccount = async () => {
    try {
      let token = localStorage.getItem('jwt')
      let obj = {}
      const { message } = await Service.deleteAccount(obj, token);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      deleteAccountDialog(false)
      signout()
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
  };

  useEffect(() => {
    getUserData();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Toaster ========== */}
      <Toaster />

      {/* ========== Delete Account Dialog ========== */}
      <Deleted open={openDeleteAccount} onClose={() => { deleteAccountDialog(false) }} deleted={deleteAccount} />

      {/* ========== Navigation ========== */}
      <Navigation />

      {/* ========== Main Content ========== */}
      <Grid id="MainContent" container spacing={0} item md={10}  >

        {/* ========== Header ========== */}
        <Header />

        {/* ========== Settings ========== */}
        <Grid item xs={12} sm={12} md={12} lg={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Settings</Typography>
          </Breadcrumbs>

          <form onSubmit={handleSubmit(updateSetting)}>
            <Grid className="setting" container spacing={0} justifyContent="center" alignItems="stretch">

              {/* ========== Account ========== */}
              <Grid className="account" container spacing={0} item sm={12} md={12} alignItems="flex-start">
                <Grid item md={12}>
                  <Typography className="heading">Account</Typography>
                </Grid>
                <Grid container spacing={1} item sm={12} md={4} alignItems="flex-end">
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
                        onChange={(e) => { email.onChange(e); saveButton(e) }}
                      />
                    </div>
                  </div>
                  {errors?.email?.message && (
                    <p className="error">{errors?.email?.message}</p>
                  )}
                </Grid>
                <Grid container spacing={1} item sm={12} md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon">
                      <ChangePassword />
                    </div>
                    <div className="input-text">
                      <label>Password</label>
                      {/* <input
                        type="password"
                        value='123456789'
                        disabled
                      /> */}
                      <input
                        type="password"
                        placeholder="*********"
                        {...register("password", {
                          minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                          }
                        })}
                        onChange={(e) => { saveButton() }}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid container spacing={1} item sm={12} md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon">
                      <Phone />
                    </div>
                    <div className="input-text" style={{ marginTop: "-5px" }}>
                      <label style={{ marginBottom: "5px" }}>Phone</label>
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
              <Grid className="app-setting" container spacing={0} item sm={12} md={12} alignItems="flex-start">
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
                        type="time"
                        defaultValue={openTime}
                        {...register("openTime")}
                        onChange={(e) => { saveButton() }}
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
                      <FormControl className="time-interval">
                        <Select
                          value={timeInterval}
                          {...register("timeInterval")}
                          onChange={(e) => { getTimeInterval(e); saveButton() }}
                        >
                          {/* Hours Convert into Mins */}
                          <MenuItem value={30}>30 Min</MenuItem>
                          <MenuItem value={45}>45 Min</MenuItem>
                          <MenuItem value={60}>1 Hrs</MenuItem>
                          <MenuItem value={120}>2 Hrs</MenuItem>
                          <MenuItem value={180}>3 Hrs</MenuItem>
                          <MenuItem value={240}>4 Hrs</MenuItem>
                          <MenuItem value={300}>5 Hrs</MenuItem>
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
                        <Switch
                          defaultChecked={notify === true ? true : false}
                          {...register("notification")}
                          onChange={() => { saveButton() }}
                        />
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>

              {/* ========== User Decision ========== */}
              <Grid className="user-decision" container spacing={0} item sm={12} md={12} alignItems="flex-start">
                <Grid item md={12}>
                  <Typography className="heading">User Decision</Typography>
                </Grid>
                <Grid container spacing={1} item md={4} alignItems="flex-end">
                  <div className="input-field">
                    <div className="icon align-icon">
                      <DeleteAccount />
                    </div>
                    <div className="input-text">
                      <Typography className="cursor-pointer" component="p" onClick={() => deleteAccountDialog(true)}>Delete My Account</Typography>
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
              <Grid item xs={12} sm={12} md={3}>
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