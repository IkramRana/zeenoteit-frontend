import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Plus } from "assets/images/icons";



function DraggableElement({ pos, prefix, elements }) {
  //console.log('file: draggableElement.js => line 10 => DraggableElement => pos', pos)
  //console.log('file: draggableElement.js => line 11 => DraggableElement => elements', elements)

  return (


    <Grid key={pos} className="wrapper" container spacing={0} item md={2}>
      {/* <h1>{prefix}</h1> */}
      <Droppable droppableId={prefix}>
        {(provided) => (
          <div style={{ width: '100%', minHeight: '10px' }} {...provided.droppableProps} {...provided.pos} ref={provided.innerRef}>
            {/* {elements.map((item, index) => (
                  <ListItem key={item.id} item={item} subTask={subTask} index={index} />
                ))} */}
            {/* {{
                  if(('column' + (i + 1)) === prefix){
                    return (
                    <ListItem key={elements.id} item={elements} subTask={subTask} />
                    )
                  }
                }} */}

            {/* {('column' + (i + 1)) === prefix &&
                  <ListItem key={elements.id} item={elements} subTask={subTask} />
                } */}
            {elements.map((task, i) => {
              if ((pos + 1) === task.column_no) {
                return (
                  <ListItem key={i} item={task} index={task.orderSequence} subTask={task.subtasks} />
                )
              }
            })}
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
