import { Droppable } from "react-beautiful-dnd";
import SubTaskList from "./subtasklist";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Plus } from "assets/images/icons";



function SubTask({ prefix, elements }) {

  return (
    <div className="content">
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div style={{ width: '100%', minHeight: '10px' }} {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <SubTaskList key={item.id} item={item} index={index} />
            ))}
            <div className="add-subtask cursor-pointer">
              <Plus />
              <Typography component="p">Add New Task</Typography>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default SubTask;
