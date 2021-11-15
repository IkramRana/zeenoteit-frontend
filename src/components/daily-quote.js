import React, { useState } from 'react';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DailyQuote(props) {

  const { open, onClose, addDailyQuote } = props

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // *For Add Daily Quote
  const dailyQuote = async (data) => {
    setLoader(true)
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
                Cancel
              </button>
            </Grid>
            <Grid item md={4}>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >
                Add Quote
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}