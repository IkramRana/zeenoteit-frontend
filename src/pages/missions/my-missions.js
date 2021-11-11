import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { AddTask, EditTask, Menu, Trash, VerticalMenu } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Grow, IconButton, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

// *Add Task Dialog
import Task from "components/task";

function MyMissions() {

  const history = useHistory();

  // *For Task
  const [openDialog, setOpenDialog] = useState(false)
  const [task, setTask] = useState([])

  // *For Menu
  const [openMenu, setOpenMenu] = useState(false)
  const menuOption = useRef(null)

  // *For Colors
  const [colors, setColors] = useState([])

  // *For Open and Close Dialog
  const dialogHandler = (type) => {
    if (type === true) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }

  // *For Add Task List
  const addTaskList = async (obj) => {
    try {
      console.log('file: my-missions.js => line 46 => addTaskList => obj', obj)
      const { message } = await Service.addTask(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dialogHandler(false)
    } catch (error) {
      console.log('file: missions.js => line 40 => error', error)
    }
  }

  // *Get Task
  const getTask = async () => {
    try {
      const { data } = await Service.getUserTask();
      setTask(data)
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

  // *For Open and Close Menu
  const menuHandler = (type) => {
    if (type === true) {
      setOpenMenu((prev) => !prev)
    } else {
      setOpenMenu(false)
    }
  }

  // *Get Colors 
  const getColors = async () => {
    try {
      const { data } = await Service.getColors();
      setColors(data)
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
    getTask();
    getColors();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Add Daily Quote Dialog ========== */}
      <Task open={openDialog} onClose={() => { dialogHandler(false) }} taskColor={colors} addTaskList={addTaskList} />

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

        {/* ========== My Missions ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >My Missions</Typography>
          </Breadcrumbs>

          {/* ========== Missions ========== */}
          <DragDropContext>
            <Grid className="mission" container spacing={0} justifyContent="flex-start" alignItems="flex-start">

              <Grid className="wrapper" container spacing={0} item md={2}>
                {task.map((task, index) => (
                  <Grid key={index} className="task-box" item md={12} style={{ borderColor: task.color }}>
                    <div className="header">
                      <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                        <Grid item md={8}>
                          <Typography component="h5">{task.title}</Typography>
                        </Grid>
                        <Grid item md={2}>
                          <IconButton aria-label="menu" size="small">
                            <AddTask />
                          </IconButton>
                        </Grid>
                        <Grid item md={2}>
                          <IconButton aria-label="menu" size="small" ref={menuOption} onClick={() => { menuHandler(true) }}>
                            {openMenu &&
                              <VerticalMenu />
                            }
                            {openMenu === false &&
                              <Menu />
                            }
                          </IconButton>

                          {/* ========== Menu Options ========== */}
                          <Popper
                            open={openMenu}
                            anchorEl={menuOption.current}
                            className="menu-option"
                            transition
                            disablePortal
                          >
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                                }}
                              >
                                <Paper>
                                  <MenuList
                                    autoFocusItem={openMenu}
                                    id="menu-list-grow"
                                  >
                                    <IconButton className="edit" aria-label="edit">
                                      <EditTask />
                                    </IconButton>
                                    <IconButton className="deleted" aria-label="deleted">
                                      <Trash />
                                    </IconButton>
                                  </MenuList>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </Grid>
                      </Grid>
                    </div>
                    <div className="content">
                      <div className="task">
                        <div className="checkbox">
                          <input type="checkbox" id="checkbox1" />
                          <label for="checkbox1"></label>
                        </div>
                        <Typography component="p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, assumenda! Eligendi ipsam ab soluta libero.</Typography>
                      </div>
                      <div className="task">
                        <div className="checkbox">
                          <input type="checkbox" id="checkbox2" />
                          <label for="checkbox2"></label>
                        </div>
                        <Typography component="p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, assumenda! Eligendi ipsam ab soluta libero.</Typography>
                      </div>
                      <div className="task">
                        <div className="checkbox">
                          <input type="checkbox" id="checkbox3" />
                          <label for="checkbox3"></label>
                        </div>
                        <Typography component="p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, assumenda! Eligendi ipsam ab soluta libero.</Typography>
                      </div>
                    </div>
                  </Grid>
                ))}

                <Grid className="add-task" item md={12} onClick={() => { dialogHandler(true) }}>
                  <AddTask />
                  <Typography component="span">Add To Do List</Typography>
                </Grid>

              </Grid>

            </Grid>
          </DragDropContext>

        </Grid>

      </Grid>

    </Grid>
  );
}

export default MyMissions;