import React, { useEffect } from 'react';

import { disabledInspect } from 'utils/index';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditTaskList(props) {

  const { open, onClose, id, taskTitle, editTaskList } = props

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // *For Add List 
  const addList = async (data) => {
    try {
      let obj = {
        id: id,
        title: data.title,
      }
      editTaskList(obj)
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
    setValue("title", taskTitle);
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
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
            <Grid item md={4}>
              <button type="button" className="button-stroke" onClick={onClose}>
                Cancel
              </button>
            </Grid>
            <Grid item md={4}>
              <button type="submit" className="button-raised" >
                Update
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}