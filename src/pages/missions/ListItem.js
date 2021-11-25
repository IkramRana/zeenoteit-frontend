import React, { useEffect, useMemo } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { EditTask, More, Plus, Trash, VerticalMenu } from "assets/images/icons";
import { Grid, IconButton, Menu, Typography } from "@material-ui/core";
import SubTask from "./subtask";
import SubTaskElement from "./subtaskelement";




function ListItem({ item, index, subTask, editTaskDialog, deleteTaskDialog }) {
  // console.log('file: ListItem.js => line 12 => ListItem => subTask', subTask);
  //console.log('file: ListItem.js => line 12 => ListItem => index', index)
  //console.log('file: ListItem.js => line 12 => ListItem => item', item)

  // *For Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  // *For Menu Open and Close 
  const menuHandler = (index, event) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Grid className="task-box" item md={12} style={{ borderColor: item.color[0].code + 'a6' }}>
              <div className="header"  {...provided.dragHandleProps} style={{ backgroundColor: item.color[0].code + '1a' }}>
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
                  <IconButton aria-label="menu" size="small" onClick={(e) => { menuHandler(index, e) }}>
                    {anchorEl && Boolean(anchorEl[index]) === true ? <VerticalMenu /> : <More />}
                  </IconButton>

                  {/* ========== Menu Options ========== */}
                    <Menu
                      className="menu-option"
                      anchorEl={anchorEl && anchorEl[index]}
                      keepMounted
                      open={anchorEl && Boolean(anchorEl[index])}
                      onClose={handleClose}
                      getContentAnchorEl={null}
                      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                      transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                      <IconButton className="edit" aria-label="edit" onClick={() => { editTaskDialog(true, item._id, item.title) }}>
                        <EditTask />
                      </IconButton>
                      <IconButton className="deleted" aria-label="deleted" onClick={() => { deleteTaskDialog(true, item._id) }}>
                        <Trash />
                      </IconButton>
                    </Menu>
                  </Grid>
                </Grid>
              </div>
              <SubTaskElement taskId={item._id} subTask={subTask} />
            </Grid>
          </div>
        );
      }}
    </Draggable>

  );
};

export default ListItem;
