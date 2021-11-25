import React, { useEffect, useMemo } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { More, Plus } from "assets/images/icons";
import { Grid, IconButton, Typography } from "@material-ui/core";
import SubTask from "./subtask";
import SubTaskElement from "./subtaskelement";




function ListItem({ item, index, subTask }) {
  //console.log('file: ListItem.js => line 12 => ListItem => index', index)
  //console.log('file: ListItem.js => line 12 => ListItem => item', item)


  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Grid className="task-box" item md={12}>
              <div className="header"  {...provided.dragHandleProps}>
                <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                  <Grid item md={8}>
                    <Typography component="h5">{item.title}</Typography>
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
              <SubTaskElement subTask={subTask} />
            </Grid>
          </div>
        );
      }}
    </Draggable>

  );
};

export default ListItem;
