import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import images from "assets/images/images";
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
                          {images.addTask}
                        </IconButton>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton aria-label="menu" size="small">
                          {images.menuDots}
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="content">
                    <Typography component="p">AI Perspectives will cover the application of AI in industry, healthcare, transport, education, social sciences and humanities, and business and economics.</Typography>
                  </div>
                </Grid>

                <Grid className="add-task" item md={12}>
                  {images.addTask}
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