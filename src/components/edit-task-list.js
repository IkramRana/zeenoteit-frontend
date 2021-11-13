import React, { useEffect, useState } from 'react';

import { disabledInspect } from 'utils';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditTaskList(props) {

  const { open, onClose, id, taskColor, editTaskList } = props

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // *For Add List 
  const addList = async (data) => {
    try {
      let obj = {
        id: id,
        title: data.title,
        // color: data.color
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
          {/* <div className="task-color">
            {taskColor.map((color, index) => (
              <label key={index} className="radio-container">
                <input type="radio" name="radio" value={color._id} {...register("color")} />
                <span className="checkmark" style={{ backgroundColor: color.code }}></span>
              </label>
            ))}
          </div> */}
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