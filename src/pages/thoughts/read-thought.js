import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import Toaster from "components/toaster";

function ReadThought() {

  const history = useHistory();
  const { id } = useParams();

  // *For Read Thought
  const [thought, setThought] = useState('')

  // *Get Read Thought
  const getThoughtByThoughtId = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { data } = await Service.getThoughtByThoughtId(id, token);
      setThought(data[0])
    } catch (error) {
      console.log('file: read-thought.js => line 30 => getThoughtByThoughtId => error', error)
    }
  };

  useEffect(() => {
    getThoughtByThoughtId();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Toaster ========== */}
      <Toaster />

      {/* ========== Navigation ========== */}
      <Navigation />

      {/* ========== Main Content ========== */}
      <Grid id="MainContent" container spacing={0} item md={10}  >

        {/* ========== Header ========== */}
        <Header />

        {/* ========== Thought ========== */}
        <Grid item xs={12} sm={12} md={12} lg={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography className="cursor-pointer" component="p" onClick={() => history.push('/my-thoughts')}>My Thoughts</Typography>
            <Typography className="text-color" component="p">Read More</Typography>
          </Breadcrumbs>

          {/* ========== Read Thought ========== */}
          <Grid className="read-thought" container spacing={0} justifyContent="center">
            <Grid item xs={12} sm={12} md={12}>
              <Typography className="title">{thought.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography className="description">
                {thought.description}
              </Typography>
            </Grid>
          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default ReadThought;