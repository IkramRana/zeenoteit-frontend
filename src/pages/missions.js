import React, { useEffect, useState } from "react";

import Images from "../assets/images";
import { disabledInspect } from '../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

// *Import Components
import Navigation from '../layouts/navigation'

function Missions() {

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div id="Missions">
      <Grid container spacing={0}>

        <Grid item md={3}>
          <Navigation />
        </Grid>

        <Grid item md={9}>

        </Grid>

      </Grid>
    </div>
  );
}

export default Missions;