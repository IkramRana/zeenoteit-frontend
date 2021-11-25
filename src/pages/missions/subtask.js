import { Droppable,Draggable } from "react-beautiful-dnd";
import SubTaskList from "./subtasklist";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Plus } from "assets/images/icons";



function SubTask({ taskComplete, prefix, elements, index }) {
  //console.log('file: subtask.js => line 10 => SubTask => index', index);
  //console.log('file: subtask.js => line 11 => SubTask => elements', elements)

  return (
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div style={{ width: '100%', minHeight: '10px' }} {...provided.droppableProps} ref={provided.innerRef}>
            {/* {elements.map((item, index) => (
              <SubTaskList key={item.id} item={item} index={index} />
            ))} */}

            <Draggable draggableId={elements._id} index={index}>
              {(provided) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className="task">
                      {/* <div className="checkbox">
                        <input type="checkbox" id={elements._id} />
                        <label htmlFor={elements._id}></label>
                      </div>
                      <Typography component="p" {...provided.dragHandleProps}>{elements.title}</Typography> */}
                      <div className="checkbox">
                        {elements.isCompleted &&
                          <input type="checkbox" checked={true} id={elements._id} />
                        }
                        {elements.isCompleted === false &&
                          <input type="checkbox" id={elements._id} onClick={(e) => taskComplete(elements._id)} />
                        }
                        <label for={elements._id}></label>
                      </div>
                      <Typography className={elements.isCompleted === true ? 'text-strike' : ''} component="p" {...provided.dragHandleProps}>{elements.title}</Typography>
                    </div>
                  </div>
                );
              }}
            </Draggable>

            {/* <div disabled className="add-subtask cursor-pointer">
              <Plus />
              <Typography component="p">Add New Task</Typography>
            </div> */}
          </div>
        )}
      </Droppable>
  );
};

export default SubTask;
