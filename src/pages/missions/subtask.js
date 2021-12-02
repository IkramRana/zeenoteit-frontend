import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Grid, Typography } from "@material-ui/core";
import { Plus, images } from "assets/images/icons";


function SubTask({ taskComplete, prefix, elements, index }) {

  // *For Text Truncate
  const [textTruncate, setTextTruncate] = useState('')

  // *For Text Truncate
  const truncateHandler = (id) => {
    try {
      if (id === textTruncate) {
        setTextTruncate('');
      } else {
        setTextTruncate(id);
      }
    } catch (error) {
      console.log('file: ListItem.js => line 36 => truncateHandler => error', error)
    }
  }

  return (
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div style={{ width: '100%', minHeight: '10px' }} {...provided.droppableProps} ref={provided.innerRef}>
          <Draggable draggableId={elements._id} index={index}>
            {(provided) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  <div className="task">
                    <div className="checkbox">
                      {elements.isCompleted &&
                        <input type="checkbox" checked={true} id={elements._id} onClick={(e) => taskComplete(elements._id, elements.isCompleted)} />
                      }
                      {elements.isCompleted === false &&
                        <input type="checkbox" id={elements._id} onClick={(e) => taskComplete(elements._id, elements.isCompleted)} />
                      }
                      <label for={elements._id}></label>
                    </div>
                    <Typography className={`cursor-pointer ${elements.isCompleted === true ? 'text-strike ' : ''}${textTruncate === elements._id ? '' : 'text-truncate'}`} onClick={() => { truncateHandler(elements._id) }} component="p" >{elements.title}</Typography>
                    <div style={{
                      width: '12px',
                      height: '12px'
                    }}
                      {...provided.dragHandleProps}
                    >
                      <img src={images.dragDot} alt="drag dot" width="12px" height="12px" />
                    </div>
                  </div>
                </div>
              );
            }}
          </Draggable>
        </div>
      )}
    </Droppable>
  );
};

export default SubTask;
