import React, { useState } from 'react';

import { Service } from "config/service";

import { Dialog, DialogContent, DialogTitle, DialogActions, List, Grid } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import useAuth from 'hooks/useAuth';
import { ImportantDevices } from '@material-ui/icons';

export default function AddQuote(props) {

  const auth = useAuth();

  const { open, onClose } = props

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Daily Quote
  const dailyQuote = async (data) => {
    setLoader(true)
    try {
      let obj = {
        quote: data.quote,
        author: data.author,
        sponsor: data.sponsored,
      }
      onClose(obj)
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
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle>Daily Quote</DialogTitle>
      <form onSubmit={handleSubmit(dailyQuote)}>
        <DialogContent>
          <input
            className="daily-quote"
            placeholder="Write Quote of the day"
            {...register("quote", {
              required: 'Quote is required'
            })}
          />
          {errors?.quote?.message && (
            <p className="error" >{errors?.quote?.message}</p>
          )}
          <input
            className="author"
            placeholder="- Quote Author"
            {...register("author")}
          />
          <input
            className="sponsored"
            placeholder="Sponsor Link"
            {...register("sponsored")}
          />

        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justifyContent="center" alignItems="center">
            <Grid item md={4}>
              <button type="button" className="button-stroke" onClick={onClose}>
                cancel
              </button>
            </Grid>
            <Grid item md={4}>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner disabled' : ''}`} disabled={loader === true ? true : false} >
                Add Quote
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}