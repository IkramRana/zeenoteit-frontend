import { Draggable } from "react-beautiful-dnd";
import React, { useMemo } from "react";
import { Plus } from "assets/images/icons";
import { Grid, IconButton, Typography } from "@material-ui/core";



function SubTaskList({ item, index }) {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="task">
              <div className="checkbox">
                <input type="checkbox" id='1' />
                <label htmlFor='1'></label>
              </div>
              <Typography component="p" {...provided.dragHandleProps}>{item.content}</Typography>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default SubTaskList;
