import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { disabledInspect } from 'utils/index';

import { Breadcrumbs, Grid, IconButton, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'

function MyMissions() {

  const history = useHistory();

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">

      {/* ========== Left Side ========== */}
      <Grid className="left-side" item md={2}>
        <Navigation />
      </Grid>

      {/* ========== Right Side ========== */}
      <Grid className="right-side" container spacing={0} item md={10}  >

        {/* ========== Header ========== */}
        <Grid item md={12}>
          <Header />
        </Grid>

        {/* ========== My Missions ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography >My Missions</Typography>
          </Breadcrumbs>

          {/* ========== Missions ========== */}
          <DragDropContext>
            <Grid className="mission" container spacing={0} justifyContent="flex-start" alignItems="flex-start">

              <Grid className="wrapper" container spacing={0} item md={2}>

                <Grid className="task-box" item md={12}>
                  <div className="header">
                    <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                      <Grid item md={8}>
                        <Typography component="h5">General To Do List</Typography>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton aria-label="menu" size="small">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16.18" height="16.18" viewBox="0 0 20.18 20.18">
                            <path id="add_tasks" d="M27.888,17.8H20.311V10.221a1.256,1.256,0,1,0-2.513,0V17.8H10.221a1.256,1.256,0,0,0,0,2.513H17.8v7.577a1.256,1.256,0,0,0,2.513,0V20.311h7.577a1.256,1.256,0,0,0,0-2.513Z" transform="translate(-8.965 -8.965)" fill="#003361" />
                          </svg>
                        </IconButton>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton aria-label="menu" size="small">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="5.001" viewBox="0 0 23 5.001">
                            <path id="menu_dots" d="M-12103-5230.5a2.5,2.5,0,0,1,2.5-2.5,2.5,2.5,0,0,1,2.5,2.5,2.5,2.5,0,0,1-2.5,2.5A2.5,2.5,0,0,1-12103-5230.5Zm-9,0a2.5,2.5,0,0,1,2.5-2.5,2.5,2.5,0,0,1,2.5,2.5,2.5,2.5,0,0,1-2.5,2.5A2.5,2.5,0,0,1-12112-5230.5Zm-9,0a2.5,2.5,0,0,1,2.5-2.5,2.5,2.5,0,0,1,2.5,2.5,2.5,2.5,0,0,1-2.5,2.5A2.5,2.5,0,0,1-12121-5230.5Z" transform="translate(12121.001 5233.001)" fill="#003361" />
                          </svg>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="content">
                    <Typography component="p">AI Perspectives will cover the application of AI in industry, healthcare, transport, education, social sciences and humanities, and business and economics.</Typography>
                  </div>
                </Grid>

                <Grid className="add-task" item md={12}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.18" height="16.18" viewBox="0 0 20.18 20.18">
                    <path id="add_tasks" d="M27.888,17.8H20.311V10.221a1.256,1.256,0,1,0-2.513,0V17.8H10.221a1.256,1.256,0,0,0,0,2.513H17.8v7.577a1.256,1.256,0,0,0,2.513,0V20.311h7.577a1.256,1.256,0,0,0,0-2.513Z" transform="translate(-8.965 -8.965)" />
                  </svg>
                  <Typography component="span">Add To Do List</Typography>
                </Grid>

              </Grid>

            </Grid>
          </DragDropContext>

        </Grid>

      </Grid>

    </Grid>
  );
}

export default MyMissions;