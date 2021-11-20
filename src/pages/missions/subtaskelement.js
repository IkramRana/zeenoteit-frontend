import { DragDropContext, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useMemo } from "react";
import { Plus } from "assets/images/icons";
import { Grid, IconButton, Typography } from "@material-ui/core";
import SubTask from "./subtask";




function SubTaskElement() {

  const getItems = (count, prefix) =>
    Array.from({ length: count }, (v, k) => k).map((k) => {
      const randomId = Math.floor(Math.random() * 1000);
      return {
        id: `item-${randomId}`,
        prefix,
        content: `SubTask ${randomId}`
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
    lists.reduce(
      (acc, listKey) => ({ ...acc, [listKey]: getItems(4, listKey) }),
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists.map((listKey) => (
        <SubTask
          elements={elements[listKey]}
          key={listKey}
          prefix={listKey}
        />
      ))}
    </DragDropContext>
  );
};

export default SubTaskElement;
