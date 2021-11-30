import { DragDropContext, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "assets/images/icons";
import { Grid, IconButton, Typography } from "@material-ui/core";
import SubTask from "./subtask";
import { Service } from "config/service";
import AddSubTask from "../../components/add-subtask";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



var list;

function SubTaskElement({ taskId, subTask }) {
  // console.log('file: subtaskelement.js => line 13 => SubTaskElement => subTask', subTask);
  // console.log('file: subtaskelement.js => line 14 => SubTaskElement => taskId', taskId);
  //console.log('file: subtaskelement.js => line 12 => SubTaskElement => subTask', subTask.subTask)
  //console.log('file: subtaskelement.js => line 13 => SubTaskElement => subTask.length', subTask.subTask.length)

  // *For Sub Task
  const [openAddSubTask, setOpenAddSubTask] = useState(false)

  const getItems = (count, prefix, obj) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
      //console.log('file: subtaskelement.js => line 17 => SubTaskElement => obj', obj)
      //console.log('file: subtaskelement.js => line 18 => SubTaskElement => prefix', prefix)
      const randomId = Math.floor(Math.random() * 1000);
      return {
        id: `item-${randomId}`,
        prefix,
        content: obj
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

  const lists = ["todo"];

  const generateLists = () =>
    // lists.reduce(
    //   (acc, listKey) => ({ ...acc, [listKey]: getItems(4, listKey) }),
    //   {}
    // );
    subTask.subTask.reduce(
      (acc, listKey) => ({ ...acc, [listKey._id]: getItems(1, listKey._id, listKey.title) }),
      {}
    );
  // {
  //   if (subTask.subTask.length > 0) {
  //     subTask.subTask.reduce(
  //       (acc, listKey) => ({ ...acc, [listKey.task_id]: getItems(4, listKey.task_id, subTask) }),
  //       {}
  //     );
  //   }
  // }

  //const [elements, setElements] = React.useState(generateLists());
  const [subTasks, setSubTasks] = React.useState([]);

  

  const onDragEnd = async (result) => {
    
    if (!result.destination) {
      return;
    }
    let splitTaskId = result.destination.droppableId.split('-');
    // console.log('file: subtaskelement.js => line 82 => onDragEnd => result', result);
    // console.log('file: subtaskelement.js => line 82 => onDragEnd => taskId', splitTaskId[1]);
    // console.log('file: subtaskelement.js => line 82 => onDragEnd => subtaskId', result.draggableId);
    // console.log('file: subtaskelement.js => line 82 => onDragEnd => sequence', result.destination.index);

    const taskId = splitTaskId[1];
    const subTaskId = result.draggableId;
    const newOrderSequence = +result.destination.index === 0 ? +result.destination.index + 1 : +result.destination.index;

    let obj = {
      taskId: taskId,
      subtaskId: subTaskId,
      newOrderSequence: newOrderSequence
    }
    //console.log('file: my-missions.js => line 333 => onDragEnd => obj', obj)
    let token = localStorage.getItem('jwt')
    const { status } = await Service.swapSubTask(obj, token);

    if(status === true){
      // let token = localStorage.getItem('jwt')
      // const { data } = await Service.getUserSubTaskByTaskId(taskId, token);
      // console.log('file: subtaskelement.js => line 106 => onDragEnd => data', data);
      // setSubTasks(data)
      getUserSubTaskByTaskId(taskId);
    }

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

  const getUserSubTaskByTaskId = async (taskId) => {
    let token = localStorage.getItem('jwt')
    const { data } = await Service.getUserSubTaskByTaskId(taskId, token);
    console.log('file: subtaskelement.js => line 106 => onDragEnd => data', data);
    setSubTasks(data)
  }

  const subTaskDialog = (type, ID) => {
    console.log('file: subtaskelement.js => line 71 => subTaskDialog => ID', ID);
    console.log('file: subtaskelement.js => line 72 => subTaskDialog => type', type);
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
      getUserSubTaskByTaskId(taskId)
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
  const taskComplete = async (subTaskId,isComplete) => {
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
      getUserSubTaskByTaskId(taskId)
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
    //setElements(generateLists());
    setSubTasks(subTask)
    // if (subTask.length > 0) {
    //   //console.log('file: subtaskelement.js => line 58 => SubTaskElement => subTask.length', subTask.length)
    //   list = subTask.map((listKey) =>
    //     <SubTask
    //       subTask={subTask}
    //       elements={elements[listKey.task_id]}
    //       key={listKey.task_id}
    //       prefix={listKey.task_id}
    //     />
    //   );
    // }
  }, []);

  return (
    
    // <DragDropContext onDragEnd={onDragEnd}>
    //   {lists.map((listKey) => (
    //     <SubTask
    //       elements={elements[listKey]}
    //       key={listKey}
    //       prefix={listKey}
    //     />
    //   ))}
    // </DragDropContext>
    <div>
      {/* ========== Add Task Dialog ========== */}
      <AddSubTask open={openAddSubTask} id={taskId} onClose={() => { subTaskDialog(false) }} addSubTask={addSubTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="content">
          {subTasks.map((subTask,index) => (
            <SubTask
              //elements={elements[listKey._id]}
              taskComplete={taskComplete}
              elements={subTask}
              index={subTask.orderSequence}
              key={subTask._id}
              prefix={subTask._id+'-'+subTask.task_id}
            />
          ))}
          <div disabled className="add-subtask cursor-pointer" onClick={() => { subTaskDialog(true, taskId) }}>
            <Plus />
            <Typography component="p">Add New Task</Typography>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default SubTaskElement;
