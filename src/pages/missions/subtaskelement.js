import { DragDropContext, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useMemo } from "react";
import { Plus } from "assets/images/icons";
import { Grid, IconButton, Typography } from "@material-ui/core";
import SubTask from "./subtask";



var list;

function SubTaskElement(subTask) {
  //console.log('file: subtaskelement.js => line 12 => SubTaskElement => subTask', subTask.subTask)
  //console.log('file: subtaskelement.js => line 13 => SubTaskElement => subTask.length', subTask.subTask.length)

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

  const [elements, setElements] = React.useState(generateLists());

  useEffect(() => {
    setElements(generateLists());

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
    <DragDropContext onDragEnd={onDragEnd}>
      {subTask.subTask.map((listKey) => (
        <SubTask
          subTask={subTask}
          elements={elements[listKey._id]}
          key={listKey._id}
          prefix={listKey._id}
        />
      ))}
      {/* <div disabled className="add-subtask cursor-pointer">
        <Plus />
        <Typography component="p">Add New Task</Typography>
      </div> */}
    </DragDropContext>
  );
};

export default SubTaskElement;
