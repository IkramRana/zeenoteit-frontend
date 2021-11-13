import React, { useEffect, useState } from 'react';

import { disabledInspect } from 'utils';

import { Dialog, DialogContent, DialogTitle, DialogActions, Grid, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Deleted(props) {

  const { open, onClose, id, deleted } = props

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
      <DialogContent>
        <Typography component="h5">Are you sure you want to delete?</Typography>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item md={4}>
            <button type="button" className="button-stroke" onClick={onClose}>
              Cancel
            </button>
          </Grid>
          <Grid item md={4}>
            <button type="button" className="button-raised" onClick={() => { deleted(id) }}>
              Yes
            </button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}