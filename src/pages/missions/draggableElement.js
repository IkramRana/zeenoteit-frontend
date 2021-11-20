import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Plus } from "assets/images/icons";



function DraggableElement({ prefix, elements }) {

  return (
    <Grid className="wrapper" container spacing={0} item md={2}>
      {/* <h1>{prefix}</h1> */}
      <Droppable droppableId={prefix}>
        {(provided) => (
          <div style={{ width: '100%', minHeight: '10px' }} {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
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
  );
};

export default DraggableElement;
