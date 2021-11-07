import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import images from "assets/images/images";
import { disabledInspect } from 'utils/index';

import { Breadcrumbs, Grid, IconButton, Typography } from '@material-ui/core';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

function MyThoughts() {

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

        {/* ========== My Thoughts ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography component="p">My Thoughts</Typography>
          </Breadcrumbs>

          {/* ========== Thoughts ========== */}
          <Grid className="thought" container spacing={0} justifyContent="flex-start" alignItems="flex-start">

            <Grid className="thought-box" item md={3}>
              <div className="header">
                <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                  <Grid item md={10}>
                    <Typography component="h5">Human-Centered AI</Typography>
                    <Typography component="h6">02 Nov 2021</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="menu" size="small">
                      {images.menuDots}
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <div className="content">
                <Typography component="p">AI Perspectives will cover the application of AI in industry, healthcare, transport, education, social sciences and humanities, and business and economics.</Typography>
                <Typography component="span" onClick={() => history.push('/my-thoughts')}>ReadMore</Typography>
              </div>
            </Grid>

            <Grid className="add-thought" item md={3} onClick={() => history.push('/write-thoughts')}>
              {images.editTask}
              <Typography component="span">Write New Journal</Typography>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default MyThoughts;