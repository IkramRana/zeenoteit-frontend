import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

function WriteThought() {

  const history = useHistory();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Save Thought
  const save = async (data) => {
    setLoader(true)
    try {
      let obj = {
        title: data.title,
        description: data.description,
      }
      const { message } = await Service.addThought(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setTimeout(() => {
        history.push('/my-thoughts')
      }, 1000);
    } catch (error) {
      console.log('Login -> error', error);
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
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
            <Typography className="text-color" component="p">Write Your Thoughts</Typography>
          </Breadcrumbs>

          {/* ========== Write Thought ========== */}
          <form className="write-thought" onSubmit={handleSubmit(save)}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item md={12}>
                <input
                  className="title"
                  placeholder="Thought Title"
                  {...register("title", {
                    required: 'Title is required'
                  })}
                />
                {errors?.title?.message && (
                  <p className="error" >{errors?.title?.message}</p>
                )}
              </Grid>
              <Grid item md={12}>
                <textarea
                  className="description"
                  placeholder="Description"
                  {...register("description", {
                    required: 'Thought is required'
                  })}
                >
                </textarea>
                {errors?.description?.message && (
                  <p className="error" >{errors?.description?.message}</p>
                )}
              </Grid>
              <Grid item md={3}>
                <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false}>Save</button>
              </Grid>
            </Grid>
          </form>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default WriteThought;