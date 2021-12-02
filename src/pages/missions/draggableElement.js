import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Plus } from "assets/images/icons";


function DraggableElement({ pos, prefix, elements, taskDialog, editTaskDialog, deleteTaskDialog }) {

  return (
    <Grid key={pos} className="wrapper" container spacing={0} item md={2}>
      <Droppable droppableId={prefix}>
        {(provided) => (
          <div style={{ width: '100%', minHeight: '10px' }} {...provided.droppableProps} {...provided.pos} ref={provided.innerRef}>
            {elements.map((task, i) => {
              if ((pos + 1) === task.column_no) {
                return (
                  <ListItem key={i} item={task} index={task.orderSequence} subTask={task.subtasks} editTaskDialog={editTaskDialog}
                    deleteTaskDialog={deleteTaskDialog} />
                )
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Grid className="add-task" item md={12} onClick={() => { taskDialog(true, (pos + 1)) }}>
        <Plus />
        <Typography component="span">Add To Do List</Typography>
      </Grid>
    </Grid>
  );
};

export default DraggableElement;
