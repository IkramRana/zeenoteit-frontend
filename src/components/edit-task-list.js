import React, { useEffect, useState } from 'react';

import { disabledInspect } from 'utils/index';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Toaster from './toaster';

export default function EditTaskList(props) {

  const { open, onClose, id, taskTitle, editTaskList } = props

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // *For Add List 
  const addList = async (data) => {
    setLoader(true)
    try {
      let obj = {
        id: id,
        title: data.title,
      }
      editTaskList(obj)
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

  useEffect(() => {
    setValue("title", taskTitle);
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      disableBackdropClick
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >

      {/* ========== Toaster ========== */}
      <Toaster />

      <DialogTitle>Edit Title</DialogTitle>
      <form onSubmit={handleSubmit(addList)}>
        <DialogContent>
          <input
            className="task-title"
            placeholder="List Title..."
            {...register("title", {
              required: 'Title is required'
            })}
          />
          {errors?.title?.message && (
            <p className="error" >{errors?.title?.message}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={5} md={4}>
              <button type="button" className="button-stroke" onClick={onClose}>
                Cancel
              </button>
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >
                Update
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}