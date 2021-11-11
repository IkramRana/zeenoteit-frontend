import React, { useEffect, useRef, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

import { EditTask, Menu, Trash, VerticalMenu } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import { Service } from "config/service";

import { Breadcrumbs, Grid, Grow, IconButton, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Components
import Navigation from 'layouts/navigation'
import Header from 'layouts/header'


function MyThoughts() {

  const history = useHistory()

  // *Get Thoughts
  const [thoughts, setThoughts] = useState([])

  // *For Menu
  const [openMenu, setOpenMenu] = useState(false)
  const menuOption = useRef(null)

  // *For Open and Close Menu
  const menuHandler = (type) => {
    if (type === true) {
      setOpenMenu((prev) => !prev)
    } else {
      setOpenMenu(false)
    }
  }

  // *Get Thoughts
  const getThought = async () => {
    try {
      const { data } = await Service.getThought();
      setThoughts(data)
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    getThought();
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

        {/* ========== My Thoughts ========== */}
        <Grid item md={12}>

          {/* ========== Breadcrumbs ========== */}
          <Breadcrumbs aria-label="breadcrumb">
            <Typography component="p">My Thoughts</Typography>
          </Breadcrumbs>

          {/* ========== Thoughts ========== */}
          <Grid className="thought" container spacing={0} justifyContent="flex-start" alignItems="flex-start" alignContent="flex-start">
            {/* {thoughts.map((value, index) => (
              <Grid key={index} className="thought-box" item md={3}>
                <div className="header">
                  <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                    <Grid item md={10}>
                      <Typography component="h5">{value.title}</Typography>
                      <Typography component="h6">{value.creationAt}</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="menu" size="small" ref={menuOption} onClick={() => { menuHandler(true) }}>
                        <Menu className="menuIconForChecking" />
                      </IconButton>
                      <Popper
                        open={openMenu}
                        anchorEl={menuOption.current}
                        className="dropdown"
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom"
                            }}
                          >
                            <Paper>
                              <MenuList
                                autoFocusItem={openMenu}
                                id="menu-list-grow"
                              >
                                <Typography component="h1" >icon</Typography>
                              </MenuList>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </Grid>
                  </Grid>
                </div>
                <div className="content">
                  <Typography component="p">{value.description}</Typography>
                  <Typography component="span" onClick={() => history.push('/readmore')}>ReadMore</Typography>
                </div>
              </Grid>
            ))} */}


            <Grid className="thought-box" item md={3}>
              <div className="header">
                <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                  <Grid item md={10}>
                    <Typography component="h5">7894521</Typography>
                    <Typography component="h6">45645</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="menu" size="small" ref={menuOption} onClick={() => { menuHandler(true) }}>
                      {openMenu &&
                        <VerticalMenu />
                      }
                      {openMenu === false &&
                        <Menu />
                      }
                    </IconButton>

                    {/* ========== Menu Options ========== */}
                    <Popper
                      open={openMenu}
                      anchorEl={menuOption.current}
                      className="menu-option"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom"
                          }}
                        >
                          <Paper>
                            <MenuList
                              autoFocusItem={openMenu}
                              id="menu-list-grow"
                            >
                              <IconButton className="edit" aria-label="edit" onClick={() => history.push('/edit-thought')}>
                                <EditTask />
                              </IconButton>
                              <IconButton className="deleted" aria-label="deleted">
                                <Trash />
                              </IconButton>
                            </MenuList>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                </Grid>
              </div>
              <div className="content">
                <Typography component="p">Lorem ipsum dolor sit amet coectetur adipisicing elit. Assumenda ducimus architecto voluptates voluptatem dicta quisquam ratione enim cupiditate ipsa culpa.</Typography>
                <Typography component="span" onClick={() => history.push('/readmore')}>ReadMore</Typography>
              </div>
            </Grid>

            <Grid className="add-thought" item md={3} onClick={() => history.push('/write-thought')}>
              <EditTask />
              <Typography component="span">Write New Journal</Typography>
            </Grid>

          </Grid>

        </Grid>

      </Grid>

    </Grid >
  );
}

export default MyThoughts;