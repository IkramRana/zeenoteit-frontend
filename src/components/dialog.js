import React from 'react';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddQuote(props) {

  const { open, onClose, addDailyQuote } = props

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Add Daily Quote
  const dailyQuote = async (data) => {
    try {
      let obj = {
        quote: data.quote,
        author: data.author,
        sponsor: data.sponsor,
      }
      addDailyQuote(obj)
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
            {...register("author", {
              required: 'Author is required'
            })}
          />
          {errors?.author?.message && (
            <p className="error" >{errors?.author?.message}</p>
          )}
          <input
            className="sponsor"
            placeholder="Sponsor Link"
            {...register("sponsor", {
              required: 'Sponsor is required'
            })}
          />
          {errors?.sponsor?.message && (
            <p className="error" >{errors?.sponsor?.message}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justifyContent="center" alignItems="center">
            <Grid item md={4}>
              <button type="button" className="button-stroke" onClick={onClose}>
                cancel
              </button>
            </Grid>
            <Grid item md={4}>
              <button type="submit" className="button-raised" >
                Add Quote
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}