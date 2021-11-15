import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { EditTask, More, Trash, VerticalMenu } from "assets/images/icons";
import { disabledInspect, DateFormat } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, IconButton, Menu, Typography } from '@material-ui/core';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import Deleted from "components/delete";

var deleteThoughtId = '';

function MyThoughts() {

  const history = useHistory()

  // *Get Thoughts
  const [thoughts, setThoughts] = useState([])

  // *For Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // *For Delete Thought
  const [openDeleteThought, setOpenDeleteThought] = useState(false)

  // *For Open and Close Menu
  const menuHandler = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // *Get Thoughts
  const getThought = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { data } = await Service.getThought(token);
      setThoughts(data)
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

  // *For Edit Thought
  const editThought = (ID) => {
    try {
      history.push('/edit-thought/' + ID)
      handleClose()
    } catch (error) {
      console.log('file: my-thoughts.js => line 67 => editThought => error', error)
    }
  }

  // *For Delete Thought Open and Close Dialog
  const deleteThoughtDialog = (type, ID) => {
    if (type === true) {
      deleteThoughtId = ID
      setOpenDeleteThought(true);
      handleClose()
    } else {
      setOpenDeleteThought(false);
    }
  }

  // *For Delete Thought 
  const deleteThought = async (ID) => {
    try {
      let token = localStorage.getItem('jwt')
      let obj = {
        id: ID
      }
      const { message } = await Service.deleteThought(obj, token);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      getThought()
      deleteThoughtDialog(false)
    } catch (error) {
      console.log('file: missions.js => line 40 => error', error)
    }
  }

  useEffect(() => {
    getThought();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

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

      {/* ========== Delete Thought Dialog ========== */}
      <Deleted open={openDeleteThought} id={deleteThoughtId} onClose={() => { deleteThoughtDialog(false) }} deleted={deleteThought} />

      {/* ========== Left Side ========== */}
      <Grid className="left-side" item md={2}>
        <Navigation />
      </Grid>

      {/* ========== Right Side ========== */}
      <Grid className="right-side" container spacing={0} item md={10}  >

        {/* ========== Header ========== */}
        <Grid item md={12}>
          <Header />
        </Grid>

        {/* ========== My Thoughts ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography component="p">My Thoughts</Typography>
          </Breadcrumbs>

          {/* ========== Thoughts ========== */}
          <Grid className="thought" container spacing={0} justifyContent="flex-start" alignItems="flex-start" alignContent="flex-start">
            {thoughts.map((thought, index) => (
              <Grid key={index} className="thought-box" item md={3}>
                <div className="header">
                  <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                    <Grid item md={10}>
                      <Typography component="h5">{thought.title}</Typography>
                      <Typography component="h6">{DateFormat(thought.creationAt)}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="menu" size="small" onClick={(e) => { menuHandler(index, e) }}>
                        {anchorEl && Boolean(anchorEl[index]) === true ? <VerticalMenu /> : <More />}
                      </IconButton>

                      {/* ========== Menu Options ========== */}
                      <Menu
                        className="menu-option"
                        anchorEl={anchorEl && anchorEl[index]}
                        keepMounted
                        open={anchorEl && Boolean(anchorEl[index])}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                      >
                        <IconButton className="edit" aria-label="edit" onClick={() => { editThought(thought._id) }}>
                          <EditTask />
                        </IconButton>
                        <IconButton className="deleted" aria-label="deleted" onClick={() => { deleteThoughtDialog(true, thought._id) }}>
                          <Trash />
                        </IconButton>
                      </Menu>
                    </Grid>
                  </Grid>
                </div>
                <div className="content">
                  <Typography component="p">{thought.description}</Typography>
                  <Typography component="span" onClick={() => history.push('/readmore/' + thought._id)}>Read More</Typography>
                </div>
              </Grid>
            ))}

            <Grid className="add-thought" item md={3} onClick={() => history.push('/write-thought')}>
              <EditTask />
              <Typography component="span">Write New Journal</Typography>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default MyThoughts;