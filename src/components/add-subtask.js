import React, { useEffect, useState } from 'react';

import { disabledInspect } from 'utils';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Toaster from './toaster';

export default function AddSubTask(props) {

  const { open, onClose, addSubTask, id } = props

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // *For Add Sub Task
  const subTask = async (data) => {
    setLoader(true)
    try {
      let obj = {
        task_id: id,
        title: data.subTask
      }
      addSubTask(obj)
      reset()
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
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

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

      <DialogTitle>New Task</DialogTitle>
      <form onSubmit={handleSubmit(subTask)}>
        <DialogContent>
          <input
            className="task-title"
            placeholder="Write your task..."
            {...register("subTask", {
              required: 'Sub Task is required'
            })}
          />
          {errors?.subTask?.message && (
            <p className="error" >{errors?.subTask?.message}</p>
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
                Add Task
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}