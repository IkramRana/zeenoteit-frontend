import React, { useEffect, useState } from 'react';

import { disabledInspect } from 'utils';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Toaster from './toaster';

export default function AddTask(props) {

  const { open, onClose, columnNo, taskColor, addTaskList } = props

  // *For Loader
  const [loader, setLoader] = useState(false)

  // *For Form Validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // *For Add List 
  const addList = async (data) => {
    setLoader(true)
    try {
      let obj = {
        columnNo: columnNo,
        title: data.title,
        color: data.color
      }
      addTaskList(obj)
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

  const close = () => {
    try {
      reset()
      onClose()
    } catch (error) {
      console.log('file: add-task.js => line 43 => close => error', error)
    }
  }

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

      <DialogTitle>New List</DialogTitle>
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
          <div className="task-color">
            {taskColor.map((color, index) => (
              <label key={index} className="radio-container">
                <input type="radio" name="radio" defaultChecked={index === 3 ? true : false} value={color._id} {...register("color")} />
                <span className="checkmark" style={{ backgroundColor: color.code }}></span>
              </label>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={5} md={4}>
              <button type="button" className="button-stroke" onClick={() => close()}>
                Cancel
              </button>
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <button type="submit" className={`button-raised ${loader === true ? 'spinner button-disabled ' : ''}`} disabled={loader === true ? true : false} >
                Add List
              </button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
}