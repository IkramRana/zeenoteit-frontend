import React, { useEffect, useState } from "react";

import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from "react-toastify";

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import AddTask from "components/add-task";
import AddSubTask from "components/add-subtask";
import EditTaskList from "components/edit-task-list";
import Deleted from "components/delete";
import DraggableElement from "./draggableElement";
import Toaster from "components/toaster";

var columnNo = '';
var taskId = '';
var taskTitle = '';
var deleteTaskId = '';

function MyMissions() {

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
    if (type === true) {
      columnNo = column_no;
      setOpenAddTask(true);
    } else {
      setOpenAddTask(false);
    }
  }

  // *For Edit Task List Open and Close Dialog
  const editTaskDialog = (type, ID, title) => {
    if (type === true) {
      taskId = ID
      taskTitle = title
      setOpenEditTask(true);
      handleClose()
    } else {
      setOpenEditTask(false);
    }
  }

  // *For Sub Task Open and Close Dialog
  const subTaskDialog = (type, ID) => {
    console.log('file: my-missions.js => line 71 => subTaskDialog => ID', ID);
    console.log('file: my-missions.js => line 72 => subTaskDialog => type', type);
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
      let token = localStorage.getItem('jwt')
      const { message } = await Service.addTask(obj, token);
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
  }

  // *For Edit Task List
  const editTaskList = async (obj) => {
    try {
      let token = localStorage.getItem('jwt')
      const { message } = await Service.editTask(obj, token);
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
      editTaskDialog(false)
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
  }

  // *For Add Sub Task 
  const addSubTask = async (obj) => {
    try {
      let token = localStorage.getItem('jwt')
      const { message } = await Service.addSubTask(obj, token);
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
  }

  // *Get Task
  const getTask = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { data } = await Service.getUserTask(token);
      setTask(data)
    } catch (error) {
      //console.log('file: my-missions.js => line 152 => getTask => error', error)
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // *Get Colors 
  const getColors = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { data } = await Service.getColors(token);
      setColors(data)
    } catch (error) {
      //console.log('file: my-missions.js => line 180 => getColors => error', error)
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
      let token = localStorage.getItem('jwt')
      let obj = {
        id: ID
      }
      const { message } = await Service.deleteTask(obj, token);
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
  }

  const onDragEnd = async (result) => {

    if (!result.destination) {
      return;
    }

    const taskId = result.draggableId;
    const columnNo = result.destination.droppableId.substr(6);
    // *Shairyar
    const currentOrderSequence = +result.source.index;
    // *Shairyar
    const newOrderSequence = +result.destination.index === 0 ? +result.destination.index + 1 : +result.destination.index;

    const taskCopy = [...task];
    var replaceElement = {}

    taskCopy.map((item, i) => {
      if (item._id === taskId) {
        const [removed] = taskCopy.splice(i, 1);
        replaceElement = {
          _id: removed._id,
          title: removed.title,
          color: removed.color,
          column_no: +columnNo,
          orderSequence: newOrderSequence,
          subtasks: removed.subtasks,
        }
        // taskCopy.splice(i, 0, replaceElement);
      }
    })

    // *Shairyar
    if (newOrderSequence < currentOrderSequence) {
      for (let index = 0; index < taskCopy.length; index++) {
        if (taskCopy[index].orderSequence >= newOrderSequence && taskCopy[index].orderSequence < currentOrderSequence) {
          taskCopy[index].orderSequence = +taskCopy[index].orderSequence + 1;
        }
      }
    } else {
      for (let index = 0; index < taskCopy.length; index++) {
        if (taskCopy[index].orderSequence > currentOrderSequence && taskCopy[index].orderSequence <= newOrderSequence) {
          taskCopy[index].orderSequence = +taskCopy[index].orderSequence - 1;
        }
      }
    }

    taskCopy.splice(0, 0, replaceElement);
    // *Shairyar
    taskCopy.sort(function (a, b) {
      var keyA = a.orderSequence,
        keyB = b.orderSequence;
      // *Compare
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    setTask(taskCopy)

    let obj = {
      taskId: taskId,
      columnNo: columnNo,
      newOrderSequence: newOrderSequence
    }
    let token = localStorage.getItem('jwt')
    const { data } = await Service.swapTask(obj, token);
    getTask()
  };

  useEffect(() => {
    getTask();
    getColors();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  useEffect(() => { }, [task])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Toaster ========== */}
      <Toaster />

      {/* ========== Add Task List Dialog ========== */}
      <AddTask open={openAddTask} columnNo={columnNo} onClose={() => { taskDialog(false) }} taskColor={colors} addTaskList={addTaskList} />

      {/* ========== Add Task Dialog ========== */}
      <AddSubTask open={openAddSubTask} id={taskId} onClose={() => { subTaskDialog(false) }} addSubTask={addSubTask} />

      {/* ========== Edit Task List Dialog ========== */}
      <EditTaskList open={openEditTask} id={taskId} taskTitle={taskTitle} onClose={() => { editTaskDialog(false) }} editTaskList={editTaskList} />

      {/* ========== Delete Task Dialog ========== */}
      <Deleted open={openDeleteTask} id={deleteTaskId} onClose={() => { deleteTaskDialog(false) }} deleted={deleteTask} />

      {/* ========== Navigation ========== */}
      <Navigation />

      {/* ========== Main Content ========== */}
      <Grid id="MainContent" container spacing={0} item sm={12} md={10}  >

        {/* ========== Header ========== */}
        <Header />

        {/* ========== My Missions ========== */}
        <Grid item xs={12} sm={12} md={12} lg={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs Breadcrumbs aria-label="breadcrumb">
            <Typography>My Missions</Typography>
          </Breadcrumbs>

          {/* ========== Missions ========== */}
          <Grid className="mission" container spacing={0} justifyContent="flex-start" alignItems="flex-start">

            <DragDropContext onDragEnd={onDragEnd}>
              {[...Array(5)].map((x, i) => {
                return (
                  <DraggableElement
                    getTask={getTask}
                    taskDialog={taskDialog}
                    editTaskDialog={editTaskDialog}
                    deleteTaskDialog={deleteTaskDialog}
                    elements={task}
                    pos={i}
                    key={i}
                    prefix={'column' + (i + 1)}
                  />
                )
              })}
            </DragDropContext>

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
};

export default MyMissions;
