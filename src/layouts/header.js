import React, { useEffect, useState } from "react";

import Images from "../assets/images";
import { disabledInspect } from '../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

function Header() {

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid id="Header" container spacing={0} justifyContent="space-between" alignItems="center">

      <Grid item md={7}>
        <Typography component="h2">
          <span>Welcome </span><span className="text-color"> To Your New Day!</span>
        </Typography>
        <Typography component="p">
          The winds and the waves are always on the side of the ablest aviators - Edward Gibbon
        </Typography>
      </Grid>

      <Grid className="text-right" item md={5}>
        <Typography component="h4">02 November 2021</Typography>
        <button type="button" className="add-quote">
          <img src={Images.addQuote} />
        </button>
        <button type="button" className="notification">
          <img src={Images.notification} />
        </button>
      </Grid>

    </Grid>
  );
}

export default Header;