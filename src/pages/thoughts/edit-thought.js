import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

function EditThought() {

  const history = useHistory();

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Update Thought
  const update = async (data) => {
    try {
      let obj = {
        title: data.title,
        description: data.description,
      }
      // const { message } = await Service.addThought(obj);
      // toast.success(message, {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: false,
      //   pauseOnHover: false,
      //   draggable: false,
      //   progress: undefined,
      // });
      history.push('/my-thoughts')
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

        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography className="cursor-pointer" component="p" onClick={() => history.push('/my-thoughts')}>My Thoughts</Typography>
            <Typography className="text-color" component="p">Edit Thought</Typography>
          </Breadcrumbs>

          {/* ========== Write Thought ========== */}
          <form className="write-thought" onSubmit={handleSubmit(update)}>
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
                <button type="submit" className="button-raised">Save</button>
              </Grid>
            </Grid>
          </form>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default EditThought;