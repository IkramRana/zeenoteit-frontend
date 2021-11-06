import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="5.001" viewBox="0 0 23 5.001">
                        <path id="menu_dots" d="M-12103-5230.5a2.5,2.5,0,0,1,2.5-2.5,2.5,2.5,0,0,1,2.5,2.5,2.5,2.5,0,0,1-2.5,2.5A2.5,2.5,0,0,1-12103-5230.5Zm-9,0a2.5,2.5,0,0,1,2.5-2.5,2.5,2.5,0,0,1,2.5,2.5,2.5,2.5,0,0,1-2.5,2.5A2.5,2.5,0,0,1-12112-5230.5Zm-9,0a2.5,2.5,0,0,1,2.5-2.5,2.5,2.5,0,0,1,2.5,2.5,2.5,2.5,0,0,1-2.5,2.5A2.5,2.5,0,0,1-12121-5230.5Z" transform="translate(12121.001 5233.001)" fill="#003361" />
                      </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20.922" height="23.924" viewBox="0 0 23.922 23.924">
                <path id="edit_task" d="M22.054,2.407A4.02,4.02,0,0,1,24.9,9.27L9.765,24.4a.85.85,0,0,1-.377.219L3.224,26.3A.85.85,0,0,1,2.18,25.258l1.681-6.164a.85.85,0,0,1,.219-.377L19.211,3.585A3.994,3.994,0,0,1,22.054,2.407ZM8.723,23.039,23.694,8.068a2.32,2.32,0,0,0-3.281-3.281L5.442,19.758,4.211,24.27Z" transform="translate(-2.15 -2.407)" />
              </svg>
              <Typography component="span">Write New Journal</Typography>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default MyThoughts;