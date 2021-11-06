import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { disabledInspect } from '../../utils/index';

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';

// *Import Components
import Navigation from '../../layouts/navigation'
import Header from '../../layouts/header'

function WriteThoughts() {

  const history = useHistory();

  // *For Write Thoughts
  const [thought, setThought] = useState({
    title: '',
    description: ''
  })

  const thoughtHandler = (prop) => (event) => {
    setThought({ ...thought, [prop]: event.target.value });
  }

  // *For Save Thought
  const save = async () => {
    try {
      if (thought.title === '') {
        return;
      } else {
        console.log('file: write-thoughts.js => line 33 => save => title', thought.title)
        console.log('file: write-thoughts.js => line 34 => save => description', thought.description)
        history.push('/my-thoughts');
      }
    } catch (error) {
      console.log('Login -> error', error);
    }
  }

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

        {/* ========== Write Thoughts ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography className="cursor-pointer" component="p" onClick={() => history.push('/my-thoughts')}>My Thoughts</Typography>
            <Typography className="text-color" component="p">Write Your Thoughts</Typography>
          </Breadcrumbs>

          {/* ========== Thought ========== */}
          <Grid container spacing={0} justifyContent="center">

            <Grid item md={12}>
              <input type="text" className="title" name="title" onChange={thoughtHandler('title')} placeholder="Thought Title" autoComplete="off" required />
            </Grid>

            <Grid item md={12}>
              <textarea className="description" name="description" onChange={thoughtHandler('description')} placeholder="Description" autoComplete="off" ></textarea>
            </Grid>

            <Grid item md={3}>
              <button type="button" className="button-raised" onClick={() => { save() }}>Save</button>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default WriteThoughts;