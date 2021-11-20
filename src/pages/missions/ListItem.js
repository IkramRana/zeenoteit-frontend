import React, { useEffect, useMemo } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { More, Plus } from "assets/images/icons";
import { Grid, IconButton, Typography } from "@material-ui/core";
import SubTask from "./subtask";
import SubTaskElement from "./subtaskelement";




function ListItem({ item, index }) {


  return (
    <Draggable draggableId={item.id} index={index}>
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

  );
};

export default ListItem;
