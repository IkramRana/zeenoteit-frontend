import React, { useEffect, useState } from "react";

import { disabledInspect } from '../utils/index';

import { Grid, IconButton, Typography, } from '@material-ui/core';

function Header() {

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid id="Header" container spacing={0} justifyContent="space-between" alignItems="center">

      <Grid item md={7}>
        <Typography component="h2">
          <span>Welcome </span><span className="text-color">To Your New Day!</span>
        </Typography>
        <Typography component="p">
          The winds and the waves are always on the side of the ablest aviators - Edward Gibbon
        </Typography>
      </Grid>

      <Grid className="text-right" item md={5}>
        <Typography component="h4">04 November 2021</Typography>
        <IconButton className="add-quote" size="medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="25.278" height="25.281" viewBox="0 0 36.278 36.281">
            <path id="addQuote" d="M31.534,1.757a6.247,6.247,0,0,1,4.418,10.665L13.292,35.081a1.5,1.5,0,0,1-.666.386L3.395,37.985a1.5,1.5,0,0,1-1.842-1.842l2.518-9.231a1.5,1.5,0,0,1,.386-.666L27.116,3.587A6.206,6.206,0,0,1,31.534,1.757ZM11.452,32.678,33.83,10.3a3.247,3.247,0,0,0-4.592-4.592L6.86,28.086,5.138,34.4Z" transform="translate(-1.5 -1.757)" />
          </svg>
        </IconButton>
        <IconButton className="notification" size="medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="25.574" height="25.881" viewBox="0 0 32.574 35.881">
            <path id="notifications" d="M-13889.712-5241.426a1.3,1.3,0,0,1,.475-1.776,1.3,1.3,0,0,1,1.776.471,2.032,2.032,0,0,0,1.755,1.012,2.035,2.035,0,0,0,1.755-1.012,1.3,1.3,0,0,1,1.775-.471,1.3,1.3,0,0,1,.475,1.776,4.645,4.645,0,0,1-4,2.306A4.648,4.648,0,0,1-13889.712-5241.426Zm-10.973-6.008a1.311,1.311,0,0,1-1.263-.932,1.281,1.281,0,0,1,.534-1.448,8.593,8.593,0,0,0,2.188-2.857c1.019-1.943,2.236-5.436,2.236-11.042a11.216,11.216,0,0,1,3.3-7.983,11.222,11.222,0,0,1,7.979-3.3,11.229,11.229,0,0,1,7.982,3.3,11.229,11.229,0,0,1,3.3,7.983c0,5.743,1.27,9.281,2.337,11.234a8.236,8.236,0,0,0,2.076,2.662,1.3,1.3,0,0,1,.523,1.458,1.3,1.3,0,0,1-1.246.924Zm6.294-16.279a32.569,32.569,0,0,1-.816,7.557,20.223,20.223,0,0,1-1.838,4.923c-.245.447-.489.844-.729,1.2h24.137c-.237-.353-.481-.75-.726-1.2a19.908,19.908,0,0,1-1.839-4.923,32.411,32.411,0,0,1-.816-7.557,8.7,8.7,0,0,0-8.687-8.687A8.694,8.694,0,0,0-13894.391-5263.713Z" transform="translate(13902 5275)" />
          </svg>
        </IconButton>
      </Grid>

    </Grid>
  );
}

export default Header;