import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { EditQuote, EditTask, Notification, Reminder } from "assets/images/icons";
import { disabledInspect, CurrentDate } from 'utils/index';
import { Service } from "config/service";

import { ClickAwayListener, Grid, Grow, IconButton, MenuList, Paper, Popper, Tooltip, Typography, withStyles, Badge, MenuItem } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Dialog Component
import DailyQuote from "components/daily-quote";

// *For Quote Tooltip
const QuoteToolTip = withStyles({
  tooltip: {
    fontSize: "12px",
    fontFamily: "Avenir",
    color: "#58595B",
    backgroundColor: "transparent",
    marginTop: "4px"
  }
})(Tooltip);

// *For Notification Badge
const NotificationBadge = withStyles({
  badge: {
    fontSize: '10px',
    backgroundColor: '#E82D2D',
    top: '-6px',
    right: '-5px',
    padding: '0 4px',
  }
})(Badge);

function Header() {

  const history = useHistory();

  // *For Daily Quote
  const [openDialog, setOpenDialog] = useState(false)
  const [dailyQuote, setDailyQuote] = useState('')

  // *For Notification
  const [openNotification, setOpenNotification] = useState(false)
  const notifyDropdown = useRef(null)

  // *For Open and Close Dialog
  const dialogHandler = (type) => {
    if (type === true) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }

  // *For Add Daily Quote
  const addDailyQuote = async (obj) => {
    try {
      let token = localStorage.getItem('jwt')
      const { message } = await Service.addDailyQuote(obj, token);
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      getDailyQuote()
      dialogHandler(false)
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
  }

  // *Get Daily Quote
  const getDailyQuote = async () => {
    try {
      let token = localStorage.getItem('jwt')
      const { data } = await Service.getDailyQuote(token);
      setDailyQuote(data)
    } catch (error) {
      console.log('file: header.js => line 82 => getDailyQuote => error', error)
    }
  };

  // *For Open and Close Notification
  const notificationHandler = (type) => {
    if (type === true) {
      setOpenNotification((prev) => !prev)
    } else {
      setOpenNotification(false)
    }
  }

  useEffect(() => {
    getDailyQuote();
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid id="Header" container spacing={0} justifyContent="space-between" alignItems="center">

      {/* ========== Alert Toaster ========== */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={1}
      />

      {/* ========== Add Daily Quote Dialog ========== */}
      {/* <DailyQuote open={openDialog} onClose={() => { dialogHandler(false) }} addDailyQuote={addDailyQuote} /> */}

      <Grid item md={8}>
        <Typography component="h2">
          <span>Welcome </span><span className="text-color">To Your New Day!</span>
        </Typography>
        <div className="quote">
          <Typography component="p">{dailyQuote[0]?.quote} - {dailyQuote[0]?.author}</Typography>
          <div className="sponsored">
            <Typography component="span">Sponsored by</Typography>
            <Typography className="link" component="span" onClick={() => history.push(`/${dailyQuote[0]?.sponsor}`)}>{dailyQuote[0]?.sponsor}</Typography>
          </div>
        </div>
      </Grid>

      <Grid className="text-right" item md={4}>
        <Typography component="h4">
          <CurrentDate />
        </Typography>
        {/* <QuoteToolTip className="tooltip" title="Write quote of the day">
          <IconButton className="add-quote" size="medium" onClick={() => { dialogHandler(true) }}>
            <EditQuote />
          </IconButton>
        </QuoteToolTip> */}
        <IconButton className="notification" size="medium" ref={notifyDropdown} onClick={() => { notificationHandler(true) }}>
          <NotificationBadge badgeContent={5} color="secondary">
            <Notification />
          </NotificationBadge>
        </IconButton>
        <Popper
          open={openNotification}
          anchorEl={notifyDropdown.current}
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
                <ClickAwayListener onClickAway={() => { notificationHandler(false) }}>
                  <MenuList
                    autoFocusItem={openNotification}
                    id="menu-list-grow"
                  >
                    <Typography component="h1" >Notifications</Typography>
                    <div className="notify-wrapper">
                      <MenuItem onClick={() => { notificationHandler(false) }}>
                        <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">
                          <Grid item md={1}>
                            <div className="icon">
                              <EditTask />
                            </div>
                          </Grid>
                          <Grid item md={11}>
                            <div className="head">
                              <Typography className="text-color" component="span">Daily Quote</Typography>
                              <Typography component="span">09:00 AM</Typography>
                            </div>
                            <Typography component="p">Let's complete your daily quote challenge</Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                      <MenuItem onClick={() => { notificationHandler(false) }}>
                        <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">
                          <Grid item md={1}>
                            <div className="icon">
                              <Reminder />
                            </div>
                          </Grid>
                          <Grid item md={11}>
                            <div className="head">
                              <Typography className="text-color" component="span">Daily Reminder</Typography>
                              <Typography component="span">09:00 AM</Typography>
                            </div>
                            <Typography component="p">Its time to add a task in daily routine work</Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    </div>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>

    </Grid>
  );
}

export default Header;