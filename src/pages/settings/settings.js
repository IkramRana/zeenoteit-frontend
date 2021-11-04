import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { disabledInspect } from '../../utils/index';

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';

// *Import Components
import Navigation from '../../layouts/navigation'
import Header from '../../layouts/header'

function Settings() {

  const history = useHistory();

  useEffect(() => {
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

        {/* ========== Settings ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >Settings</Typography>
          </Breadcrumbs>

          {/* ========== Account ========== */}
          <Grid container spacing={0}>

          </Grid>

        </Grid>

      </Grid>

    </Grid>
  );
}

export default Settings;