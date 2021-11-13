import React, { useEffect, useState } from 'react';

import { disabledInspect } from 'utils';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSubTask(props) {

  const { open, onClose, addSubTask, id } = props

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // *For Add Sub Task
  const subTask = async (data) => {
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
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
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
            <Grid item md={4}>
              <button type="button" className="button-stroke" onClick={onClose}>
                Cancel
              </button>
            </Grid>
            <Grid item md={4}>
              <button type="submit" className="button-raised" >
                Add Task
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}