import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

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
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    getThoughtByThoughtId();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Alert Toaster ========== */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={1}
      />

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

        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography className="cursor-pointer" component="p" onClick={() => history.push('/my-thoughts')}>My Thoughts</Typography>
            <Typography className="text-color" component="p">Read More</Typography>
          </Breadcrumbs>

          {/* ========== Read Thought ========== */}
          <Grid className="read-thought" container spacing={0} justifyContent="center">
            <Grid item md={12}>
              <Typography className="title">{thought.title}</Typography>
            </Grid>
            <Grid item md={12}>
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