import React, { useEffect, useState } from "react";

import { Plus, EditTask, More, Trash, VerticalMenu } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, CardHeader, Grid, IconButton, Menu, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'
import AddTask from "components/add-task";
import AddSubTask from "components/add-subtask";
import EditTaskList from "components/edit-task-list";
import Deleted from "components/delete";
import DraggableElement from "./draggableElement";
import SubTaskElement from "./subtaskelement";

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
      console.log('file: my-missions.js => line 152 => getTask => error', error)
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
      console.log('file: my-missions.js => line 180 => getColors => error', error)
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





  const getItems = (count, prefix) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
      const randomId = Math.floor(Math.random() * 1000);
      return {
        id: `item-${randomId}`,
        prefix,
        content: `Task ${randomId}`
      };
    });


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

  const generateLists = () =>
    lists.reduce(
      (acc, listKey) => ({ ...acc, [listKey]: getItems(2, listKey) }),
      {}
    );


  const [elements, setElements] = React.useState(generateLists());

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };





  useEffect(() => {
    getTask();
    getColors();
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

      {/* ========== Add Task List Dialog ========== */}
      <AddTask open={openAddTask} columnNo={columnNo} onClose={() => { taskDialog(false) }} taskColor={colors} addTaskList={addTaskList} />

      {/* ========== Add Task Dialog ========== */}
      <AddSubTask open={openAddSubTask} id={taskId} onClose={() => { subTaskDialog(false) }} addSubTask={addSubTask} />

      {/* ========== Edit Task List Dialog ========== */}
      <EditTaskList open={openEditTask} id={taskId} taskTitle={taskTitle} onClose={() => { editTaskDialog(false) }} editTaskList={editTaskList} />

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

            {/* <DragDropContext onDragEnd={onDragEnd}>
              {[...Array(5)].map((x, i) => (
                <Grid key={i} className="wrapper" container spacing={0} item md={2}>
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div
                        style={{ width: '100%', minHeight: '10px' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {task.map((task, index) => {
                          if ((i + 1) === task.column_no) {
                            return (
                              <Draggable
                                key={task._id}
                                draggableId={task._id}
                                index={index}
                              >
                                {(provided) => {
                                  return (
                                    <Grid key={task._id} ref={provided.innerRef}
                                      {...provided.draggableProps} className="task-box" item md={12} style={{ borderColor: task.color[0].code + 'a6' }}>
                                      <div className="header"  {...provided.dragHandleProps} style={{ backgroundColor: task.color[0].code + '1a' }} >
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
                                            </IconButton> */}

            {/* ========== Menu Options ========== */}
            {/* <Menu
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
                                      <SubTaskElement /> */}
            {/* <div className="content">
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
                                      </div> */}
            {/* </Grid>
                                  );
                                }}
                              </Draggable>
                            )
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <Grid className="add-task" item md={12} onClick={() => { taskDialog(true, (i + 1)) }}>
                    <Plus />
                    <Typography component="span">Add To Do List</Typography>
                  </Grid>

                </Grid>
              ))}
            </DragDropContext> */}

            <DragDropContext onDragEnd={onDragEnd}>
              {lists.map((listKey) => (
                < DraggableElement
                  elements={elements[listKey]}
                  key={listKey}
                  prefix={listKey}
                />
              ))}
            </DragDropContext>


            {/* <DragDropContext onDragEnd={onDragEnd}>
              {lists.map((listKey) => (
                // < DraggableElement
                //   elements={elements[listKey]}
                //   key={listKey}
                //   prefix={listKey}
                // />

                <Grid key={listKey} className="wrapper" container spacing={0} item md={2}>
                  <Droppable droppableId={listKey}>
                    {(provided) => (
                      <div
                        style={{ width: '100%', minHeight: '10px' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {elements[listKey].map((item, index) => (
                          // <ListItem key={item.id} item={item} index={index} />
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <Grid className="task-box" item md={12}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <div className="header"  {...provided.dragHandleProps}>
                                    <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                                      <Grid item md={8}>
                                        <Typography component="h5">{item.content}</Typography>
                                      </Grid>
                                      <Grid item md={2}>
                                        <IconButton aria-label="menu" size="small">
                                          <Plus />
                                        </IconButton>
                                      </Grid>
                                      <Grid item md={2}>
                                        <IconButton aria-label="menu" size="small">
                                          <More />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </div>
                                  <SubTaskElement />
                                </Grid>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <Grid className="add-task" item md={12} >
                    <Plus />
                    <Typography component="span">Add To Do List</Typography>
                  </Grid>
                </Grid>

              ))}
            </DragDropContext> */}


          </Grid>

        </Grid>

      </Grid>

    </Grid>
  );
};

export default MyMissions;