import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { EditQuote, EditTask, Notification, Reminder } from "assets/images/icons";
import { disabledInspect, CurrentDate } from 'utils/index';
import { Service } from "config/service";
import { socketConfig } from "../config/socket";

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

var timer;
let socket = null;

function Header() {

  const history = useHistory();

  // *notification
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState('')

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

  // *Get User Notifications
  const getUserNotification = async () => {
    try {
      if(notifications.length < notificationCount || notifications === ''){
        let token = localStorage.getItem('jwt')
        const { data } = await Service.getUserNotification(token);
        console.log('file: header.js => line 112 => getUserNotification => data', data);
        setNotifications(data)
        setNotificationCount(0)
      }
    } catch (error) {
      console.log('file: header.js => line 82 => getDailyQuote => error', error)
    } finally {
      notificationHandler(true)
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

  // *socket 
  const getNotificationCount = () => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let userId = userData[0]._id;

    if (socket?.disconnect) {
      socket.off('show_notification', (e) => null);
      clearTimeout(timer);
    }

    socket = socketConfig();
    let isSocketConnected;

    socket.on("connect", () => {
      socket.emit("new_notification", userId);
      isSocketConnected = true;
    });

    socket.on("disconnect", () => {
      //console.log('on disconnect =>', socket.disconnect)
      isSocketConnected = false;
    });

    socket.on("connect_error", (err) => {
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    socket.on('show_notification', obj => {
      console.log('file: header.js => line 137 => getNotificationCount => obj', obj);
      setNotificationCount(obj.notificationCount)
      timer = setTimeout(() => {
        socket.emit("new_notification", userId);
      }, 20000);
    })

    if (isSocketConnected === false) {
      //console.log(socket.disconnected);
      socket.connect();
    }
  }

  useEffect(() => {
    getDailyQuote();
    disabledInspect();
    // setTimeout(() => {
    //   getNotificationCount();
    // }, 5000);
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
        <QuoteToolTip className="tooltip" title="Write quote of the day">
          <IconButton className="add-quote" size="medium" onClick={() => { dialogHandler(true) }}>
            <EditQuote />
          </IconButton>
        </QuoteToolTip>
        <IconButton className="notification" size="medium" ref={notifyDropdown} onClick={() => { getUserNotification() }}>
          <NotificationBadge badgeContent={notificationCount} color="secondary">
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
                    {notifications.map((notification, i) => (
                      <MenuItem key={i} onClick={() => { notificationHandler(false) }}>
                        <Grid container spacing={0} justifyContent="flex-start" alignItems="flex-start">
                          <Grid item md={1}>
                            <div className="icon">
                              <div className={ notification.isRead === false ? "unread" : ""}></div>
                              <Reminder/>
                            </div>
                          </Grid>
                          <Grid item md={11}>
                            <div className="head">
                              <Typography className="text-color" component="span">{notification.notificationTitle}</Typography>
                              <Typography component="span">{notification.notificationTime}</Typography>
                            </div>
                            <Typography component="p">{notification.notificationDescription}</Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))}
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