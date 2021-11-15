import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Plus, EditTask, More, Trash, VerticalMenu } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Grow, IconButton, Menu, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

// *Import Dialog Components
import AddTask from "components/add-task";
import AddSubTask from "components/add-subtask";
import EditTaskList from "components/edit-task-list";
import Deleted from "components/delete";

var columnNo = '';
var taskId = '';
var deleteTaskId = '';

function MyMissions() {

  const history = useHistory();

  // *For Task List
  const [openAddTask, setOpenAddTask] = useState(false)
  const [task, setTask] = useState([])

  // *For Edit Task List
  const [openEditTask, setOpenEditTask] = useState(false)

  // *For Sub Task
  const [openAddSubTask, setOpenAddSubTask] = useState(false)

  // *For Delete Task
  const [openDeleteTask, setOpenDeleteTask] = useState(false)

  // *For Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // *For Colors
  const [colors, setColors] = useState([])

  // *For Task List Open and Close Dialog
  const taskDialog = (type, column_no) => {
    columnNo = column_no;
    if (type === true) {
      setOpenAddTask(true);
    } else {
      setOpenAddTask(false);
    }
  }

  // *For Edit Task List Open and Close Dialog
  const editTaskDialog = (type, ID) => {
    if (type === true) {
      taskId = ID
      setOpenEditTask(true);
    } else {
      setOpenEditTask(false);
    }
  }

  // *For Sub Task Open and Close Dialog
  const subTaskDialog = (type, ID) => {
    if (type === true) {
      taskId = ID
      setOpenAddSubTask(true);
    } else {
      setOpenAddSubTask(false);
    }
  }

  // *For Add Task List
  const addTaskList = async (obj) => {
    try {
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
      getTask()
      taskDialog(false)
    } catch (error) {
      console.log('file: missions.js => line 40 => error', error)
    }
  }

  // *For Edit Task List
  const editTaskList = async (obj) => {
    try {
      console.log('file: my-missions.js => line 99 => editTaskList => obj', obj)
      const { message } = await Service.editTask(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      handleClose()
      getTask()
      editTaskDialog(false)
    } catch (error) {
      console.log('file: missions.js => line 40 => error', error)
    }
  }

  // *For Add Sub Task 
  const addSubTask = async (obj) => {
    try {
      const { message } = await Service.addSubTask(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      getTask()
      subTaskDialog(false)
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

  // *For Menu Open and Close 
  const menuHandler = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  // *For Delete Task Open and Close Dialog
  const deleteTaskDialog = (type, ID) => {
    if (type === true) {
      deleteTaskId = ID
      setOpenDeleteTask(true);
      handleClose()
    } else {
      setOpenDeleteTask(false);
    }
  }

  // *For Delete Task 
  const deleteTask = async (ID) => {
    try {
      let obj = {
        id: ID
      }
      const { message } = await Service.deleteTask(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      getTask()
      deleteTaskDialog(false)
    } catch (error) {
      console.log('file: missions.js => line 40 => error', error)
    }
  }

  // *For Task Complete
  const taskComplete = async (subTaskId) => {
    try {
      let obj = {
        id: subTaskId
      }
      const { message } = await Service.completeSubTask(obj);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      getTask()
    } catch (error) {
      console.log('file: my-missions.js => line 224 => MyMissions => error', error)
    }
  }

  useEffect(() => {
    getTask();
    getColors();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Add Task List Dialog ========== */}
      <AddTask open={openAddTask} columnNo={columnNo} onClose={() => { taskDialog(false) }} taskColor={colors} addTaskList={addTaskList} />

      {/* ========== Add Task Dialog ========== */}
      <AddSubTask open={openAddSubTask} id={taskId} onClose={() => { subTaskDialog(false) }} addSubTask={addSubTask} />

      {/* ========== Edit Task List Dialog ========== */}
      <EditTaskList open={openEditTask} id={taskId} onClose={() => { editTaskDialog(false) }} editTaskList={editTaskList} />

      {/* ========== Delete Task Dialog ========== */}
      <Deleted open={openDeleteTask} id={deleteTaskId} onClose={() => { deleteTaskDialog(false) }} deleted={deleteTask} />

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
          <Grid className="mission" container spacing={0} justifyContent="flex-start" alignItems="flex-start">



            {[...Array(5)].map((x, i) => (

              <Grid key={i} className="wrapper" container spacing={0} item md={2}>

                {task.map((task, index) => {

                  if((i+1) === task.column_no) {
                    return (
                      <Grid key={index} className="task-box" item md={12} style={{ borderColor: task.color[0].code + 'a6' }}>
                      <div className="header" style={{ backgroundColor: task.color[0].code + '1a' }} >
                        <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                          <Grid item md={8}>
                            <Typography component="h5">{task.title}</Typography>
                          </Grid>
                          <Grid item md={2}>
                            <IconButton aria-label="menu" size="small" onClick={() => { subTaskDialog(true, task._id) }}>
                              <Plus />
                            </IconButton>
                          </Grid>
                          <Grid item md={2}>
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
                              <IconButton className="edit" aria-label="edit" onClick={() => { editTaskDialog(true, task._id) }}>
                                <EditTask />
                              </IconButton>
                              <IconButton className="deleted" aria-label="deleted" onClick={() => { deleteTaskDialog(true, task._id) }}>
                                <Trash />
                              </IconButton>
                            </Menu>
                          </Grid>
                        </Grid>
                      </div>
                      <div className="content">
                        {task.subtasks.map((subTask, i) => (
                          <div key={i} className="task">
                            <div className="checkbox">
                              {subTask.isCompleted &&
                                <input type="checkbox" checked={true} id={subTask._id} />
                              }
                              {subTask.isCompleted === false &&
                                <input type="checkbox" id={subTask._id} onClick={(e) => taskComplete(subTask._id)} />
                              }
                              <label for={subTask._id}></label>
                            </div>
                            <Typography className={subTask.isCompleted == true ? 'text-strike' : ''} component="p">{subTask.title}</Typography>
                          </div>
                        ))}

                        <div className="add-subtask cursor-pointer" onClick={() => { subTaskDialog(true, task._id) }}>
                          <Plus />
                          <Typography component="p">Add New Task</Typography>
                        </div>
                      </div>
                      </Grid>
                    )
                  }

                })}

                <Grid className="add-task" item md={12} onClick={() => { taskDialog(true,(i+1)) }}>
                  <Plus />
                  <Typography component="span">Add To Do List</Typography>
                </Grid>
              </Grid>

            ))}

          </Grid>

        </Grid>

      </Grid>

    </Grid>
  );
}

export default MyMissions;