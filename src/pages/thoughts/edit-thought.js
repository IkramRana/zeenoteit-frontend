import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

function EditThought() {

  const history = useHistory();
  const { id } = useParams();

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Get Thought By Id
  const [thought, setThought] = useState([])

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // *Get Thought By Id
  const getThoughtByThoughtId = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { data } = await Service.getThoughtByThoughtId(id, token);
      setThought(data[0]);

      // *For Default Value
      setValue("title", data[0].title);
      setValue("description", data[0].description);
    } catch (error) {
      console.log('file: edit-thought.js => line 41 => getThoughtByThoughtId => error', error)
    }
  };

  // *For Update Thought
  const update = async (data) => {
    setLoader(true)
    try {
      let token = localStorage.getItem('jwt')
      let obj = {
        id: id,
        title: data.title,
        description: data.description,
      }
      const { message } = await Service.editThought(obj, token);
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
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getThoughtByThoughtId();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [register])

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
            <Typography className="text-color" component="p">Edit Thought</Typography>
          </Breadcrumbs>

          {/* ========== Write Thought ========== */}
          <form className="write-thought" onSubmit={handleSubmit(update)}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item md={12}>
                <input
                  name="title"
                  className="title"
                  placeholder="Thought Title"
                  setValue={thought.title}
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
                  name="description"
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

export default EditThought;