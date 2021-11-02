import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Images from "../assets/images";
import { disabledInspect } from '../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

function Navigation() {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('jwt');
    history.push('/login')
  }

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid id="Navigation" container spacing={0} justifyContent="space-between" alignItems="center">

      <Grid container spacing={0} item md={12} justifyContent="center" alignItems="center">

        <Grid item md={12}>
          <img src={Images.logo} alt="zeNoteit" width="100px" />
        </Grid>

        <Grid item md={12}>
          <Typography component="ul">
            <Typography component="li" >
              <div>
                <img src={Images.missionActive} />
                <span>My Missions</span>
              </div>
            </Typography>
            <Typography component="li" >
              <div>
                <img src={Images.thoughtInactive} alt="" />
                <span>My Thoughts</span>
              </div>
            </Typography>
            <Typography component="li" >
              <div>
                <img src={Images.settingActive} alt="" />
                <span>Settings</span>
              </div>
            </Typography>
          </Typography>
        </Grid>

      </Grid>

      <Grid item md={12}>
        <Typography component="ul">
          <Typography component="li" onClick={logout}>
            <div>
              <img src={Images.logoutInactive} />
              <span>Logout</span>
            </div>
          </Typography>
        </Typography>
      </Grid>

    </Grid>
  );
}

export default Navigation;