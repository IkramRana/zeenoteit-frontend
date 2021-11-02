import React, { useEffect, useState } from "react";

import Images from "../assets/images";
import { disabledInspect } from '../utils/index';

import { Divider, Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

// *Import Components
import Navigation from '../layouts/navigation'
import Header from '../layouts/header'

function Missions() {

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div id="Missions">
      <Grid container spacing={0}>

        {/* ========== Left Side ========== */}
        <Grid className="left-side" item md={2}>
          <Navigation />
        </Grid>

        {/* ========== Right Side ========== */}
        <Grid container spacing={0} className="right-side" item md={10}>

          {/* ========== Header ========== */}
          <Grid item md={12}>
            <Header />
          </Grid>

          <Divider />

          {/* ========== Missions ========== */}
          <Grid item md={12}>

          </Grid>

        </Grid>

      </Grid>
    </div>
  );
}

export default Missions;