import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { EditTask, More, Plus, Trash, VerticalMenu } from "assets/images/icons";
import { Grid, IconButton, Menu, Typography } from "@material-ui/core";
import SubTask from "./subtask";
import AddSubTask from "components/add-subtask";
import { Service } from "config/service";
import { toast } from "react-toastify";


var taskId = '';

function ListItem({ item, getTask, index, subTask, editTaskDialog, deleteTaskDialog }) {
//console.log('file: ListItem.js => line 14 => ListItem => subTask', subTask);

  // *For Text Truncate
  const [textTruncate, setTextTruncate] = useState('')

  // *For Menu
  const [anchorEl, setAnchorEl] = useState(null);

  const [subTasks, setSubTasks] = React.useState([]);

  // *For Sub Task
  const [openAddSubTask, setOpenAddSubTask] = useState(false)

  // *For Menu Open and Close 
  const menuHandler = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // *For Text Truncate
  const truncateHandler = (id) => {
    try {
      if (id === textTruncate) {
        setTextTruncate('');
      } else {
        setTextTruncate(id);
      }
    } catch (error) {
      console.log('file: ListItem.js => line 36 => truncateHandler => error', error)
    }
  }

  const onDragEnd = async (result) => {

    if (!result.destination) {
      return;
    }
    let splitTaskId = result.destination.droppableId.split('-');

    const taskId = splitTaskId[1];
    const subTaskId = result.draggableId;
    const newOrderSequence = +result.destination.index === 0 ? +result.destination.index + 1 : +result.destination.index;

    let obj = {
      taskId: taskId,
      subtaskId: subTaskId,
      newOrderSequence: newOrderSequence
    }
    let token = localStorage.getItem('jwt')
    const { status } = await Service.swapSubTask(obj, token);

    if (status === true) {
      getUserSubTaskByTaskId(taskId);
    }
  };

  const getUserSubTaskByTaskId = async (taskId) => {
    let token = localStorage.getItem('jwt')
    const { data } = await Service.getUserSubTaskByTaskId(taskId, token);
    //console.log('file: ListItem.js => line 76 => getUserSubTaskByTaskId => data', data);
    // setSubTasks(data)
    setSubTasks([...data])
  }

  const subTaskDialog = (type, ID) => {
    if (type === true) {
      taskId = ID
      setOpenAddSubTask(true);
    } else {
      setOpenAddSubTask(false);
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
      getUserSubTaskByTaskId(item._id)
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

  // *For Task Complete
  const taskComplete = async (subTaskId, isComplete) => {
    try {
      let token = localStorage.getItem('jwt')
      let status = isComplete === true ? false : true;
      let obj = {
        id: subTaskId,
        status: status
      }
      const { message } = await Service.checkUncheckSubtask(obj, token);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      getUserSubTaskByTaskId(item._id)
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

  useEffect(() => {
    setSubTasks([...subTask])
    //console.log(parseInt(item.column_no+''+item.orderSequence));
  }, []);

  useEffect(() => {
    //console.log('file: ListItem.js => line 158 => ListItem => subTasks', subTasks);
  }, [subTasks]);

  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            {/* ========== Add Task Dialog ========== */}
            <AddSubTask open={openAddSubTask} id={item._id} onClose={() => { subTaskDialog(false) }} addSubTask={addSubTask} />

            <Grid className="task-box" item md={12} style={{ borderColor: item.color[0].code + 'a6' }}>
              <div className="header"  {...provided.dragHandleProps} style={{ backgroundColor: item.color[0].code + '1a' }}>
                <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                  <Grid item md={8} onClick={() => { truncateHandler(item._id) }}>
                    <Typography className={`cursor-pointer ${textTruncate === item._id ? '' : 'text-truncate'}`} component="h5">{item.title}</Typography>
                  </Grid>
                  <Grid item md={2}>
                    <IconButton aria-label="menu" size="small" onClick={() => { subTaskDialog(true, item._id) }}>
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
                      <IconButton className="edit" aria-label="edit" onClick={() => { editTaskDialog(true, item._id, item.title) }}>
                        <EditTask />
                      </IconButton>
                      <IconButton className="deleted" aria-label="deleted" onClick={() => { deleteTaskDialog(true, item._id) }}>
                        <Trash />
                      </IconButton>
                    </Menu>
                  </Grid>
                </Grid>
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="content">
                  {subTasks.map((subTask, index) => (
                    <SubTask
                      taskComplete={taskComplete}
                      elements={subTask}
                      index={subTask.orderSequence}
                      key={subTask._id}
                      prefix={subTask._id + '-' + subTask.task_id}
                    />
                  ))}
                  <div disabled className="add-subtask cursor-pointer" onClick={() => { subTaskDialog(true, item._id) }}>
                    <Plus />
                    <Typography component="p">Add New Task</Typography>
                  </div>
                </div>
              </DragDropContext>
            </Grid>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
