import React, { useEffect, useState } from "react";

import Images from "../assets/images";
import { disabledInspect } from '../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

function Navigation() {

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div >
      <Grid id="Navigation" container spacing={0} direction="space-between" justifyContent="center" alignItems="center">

        <Grid container spacing={0} item md={12} justifyContent="center" alignItems="center">

          <Grid item md={12}>
            <img src={Images.logo} alt="zeNoteit" width="100px" />
          </Grid>

          <Grid item md={12}>
            <Typography component="ul">
              <Typography component="li" >
                <img src={Images.missionActive} alt="" />
                <span>My Missions</span>
              </Typography>
            </Typography>
          </Grid>

        </Grid>

        <Grid item md={12}></Grid>

      </Grid>
    </div>
  );
}

export default Navigation;