import React, { useEffect, useState } from "react";

import { Plus, EditTask, More, Trash, VerticalMenu } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

<<<<<<< HEAD
import { Breadcrumbs, CardHeader, Grid, IconButton, Menu, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from "react-toastify";
=======
import { Breadcrumbs, Grid, IconButton, Menu, Typography } from '@material-ui/core';
import { toast } from "react-toastify";
>>>>>>> 23d5c35a59a8628f1283cb12bb76ccdc2fcdcd8d
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import AddTask from "components/add-task";
import AddSubTask from "components/add-subtask";
import EditTaskList from "components/edit-task-list";
import Deleted from "components/delete";
<<<<<<< HEAD
import DraggableElement from "./draggableElement";
=======
import Toaster from "components/toaster";
>>>>>>> 23d5c35a59a8628f1283cb12bb76ccdc2fcdcd8d

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

  // *For Task Complete
  const taskComplete = async (subTaskId) => {
    try {
      let token = localStorage.getItem('jwt')
      let obj = {
        id: subTaskId
      }
      const { message } = await Service.completeSubTask(obj, token);
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

<<<<<<< HEAD
  const getItems = (count, prefix, obj) =>
  //Array.from({ length: count }, (v, k) => k).map((k) => {
  {
    const randomId = Math.floor(Math.random() * 1000);
    //console.log('file: my-missions.js => line 275 => Array.from => randomId', randomId)
    //console.log('file: my-missions.js => line 276 => Array.from => prefix', prefix)
    return {
      id: `item-${randomId}`,
      prefix,
      content: obj.title
    };
  }
  //});

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const lists = ["column1", "column2", "column3", "column4", "column5"];

  const generateLists = () => {
    // lists.reduce(
    //   (acc, listKey) => ({ ...acc, [listKey]: getItems(2, listKey) }),
    //   {}
    // );
    // task.reduce(
    //   (acc, listKey) => ({ ...acc, ['column' + listKey.column_no]: getItems(1, 'column' + listKey.column_no, listKey) }),
    //   {}
    // );
  }



  const [elements, setElements] = React.useState(generateLists());

  // useEffect(() => {
  //   setElements(generateLists());
  // }, []);

  const onDragEnd = async (result) => {
    console.log('file: my-missions.js => line 318 => onDragEnd => result', result)
    //console.log('file: my-missions.js => line 318 => onDragEnd => result', result.draggableId)
    //console.log('file: my-missions.js => line 318 => onDragEnd => result.destination.droppableId.substr', result.destination.droppableId.substr(6))

    if (!result.destination) {
      return;
    }
    
    const taskId = result.draggableId;
    const columnNo = result.destination.droppableId.substr(6);
    const newOrderSequence = +result.destination.index === 0 ? +result.destination.index + 1 : +result.destination.index;

    let obj = {
      taskId: taskId,
      columnNo: columnNo,
      newOrderSequence: newOrderSequence
    }
    console.log('file: my-missions.js => line 333 => onDragEnd => obj', obj)
    let token = localStorage.getItem('jwt')
    const { data } = await Service.swapTask(obj, token);
    getTask()


    // if (!result.destination) {
    //   return;
    // }
    // const listCopy = { ...elements };

    // const sourceList = listCopy[result.source.droppableId];
    // const [removedElement, newSourceList] = removeFromList(
    //   sourceList,
    //   result.source.index
    // );
    // listCopy[result.source.droppableId] = newSourceList;
    // const destinationList = listCopy[result.destination.droppableId];
    // listCopy[result.destination.droppableId] = addToList(
    //   destinationList,
    //   result.destination.index,
    //   removedElement
    // );

    // setElements(listCopy);
  };





=======
>>>>>>> 23d5c35a59a8628f1283cb12bb76ccdc2fcdcd8d
  useEffect(() => {
    getTask();
    getColors();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

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

<<<<<<< HEAD

            {/* <DragDropContext onDragEnd={onDragEnd}>
              {lists.map((listKey) => (
                `${//console.log(listKey)}`,
                < DraggableElement
                  elements={elements[listKey]}
                  key={listKey}
                  prefix={listKey}
                />
              ))}
            </DragDropContext> */}
            {/* <DragDropContext onDragEnd={onDragEnd}>
              {task.map((listKey, index) => (
                `${//console.log('column' + listKey.column_no)}`,
                < DraggableElement
                  //elements={elements['column' + listKey.column_no]}
                  elements={getItems(1, 'column' + listKey.column_no, listKey)}
                  //elements={generateLists()}
                  subTask={listKey.subtasks}
                  key={index}
                  prefix={'column' + listKey.column_no}
                />
              ))}
            </DragDropContext> */}
            <DragDropContext onDragEnd={onDragEnd}>
              {[...Array(5)].map((x, i) => {
                return (
                  <DraggableElement
                    //elements={elements['column' + listKey.column_no]}
                    taskDialog={taskDialog}
                    editTaskDialog={editTaskDialog}
                    deleteTaskDialog={deleteTaskDialog}
                    elements={task}
                    //elements={generateLists()}
                    pos={i}
                    key={i}
                    prefix={'column' + (i + 1)}
                  />
                )
              })}
            </DragDropContext>

=======
            {[...Array(5)].map((x, i) => (
              <Grid key={i} className="wrapper" container spacing={0} item>
                {task.map((task, index) => {
                  if ((i + 1) === task.column_no) {
                    return (
                      <Grid key={task._id} className="task-box" item xs={12} sm={12} md={12} style={{ borderColor: task.color[0].code + 'a6' }}>
                        <div className="header" style={{ backgroundColor: task.color[0].code + '1a' }} >
                          <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                            <Grid item xs={7} sm={7} md={7} lg={7}>
                              <Typography component="h5">{task.title}</Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                              <IconButton aria-label="menu" size="small" onClick={() => { subTaskDialog(true, task._id) }}>
                                <Plus />
                              </IconButton>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
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
                                <IconButton className="edit" aria-label="edit" onClick={() => { editTaskDialog(true, task._id, task.title) }}>
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

                <Grid className="add-task" item xs={12} sm={12} md={12} onClick={() => { taskDialog(true, (i + 1)) }}>
                  <Plus />
                  <Typography component="span">Add To Do List</Typography>
                </Grid>

              </Grid>
            ))}
>>>>>>> 23d5c35a59a8628f1283cb12bb76ccdc2fcdcd8d

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
};

export default MyMissions;
