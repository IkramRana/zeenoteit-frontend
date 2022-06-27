import React, { useEffect, useRef, useState } from "react";

import { Logo, Notification, Reminder } from "assets/images/icons";
import { disabledInspect, CurrentDate, Responsive } from 'utils/index';
import { Service } from "config/service";
import { socketConfig } from "../config/socket";

import { ClickAwayListener, Grid, Grow, IconButton, MenuList, Paper, Popper, Typography, withStyles, Badge, MenuItem, Hidden, useMediaQuery } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

// *Import Components
import Navigation from 'layouts/navigation'

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

  // *For Notification
  const [openNotification, setOpenNotification] = useState(false)
  const notifyDropdown = useRef(null)

  // *For Notification Count
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState('')

  // *For Daily Quote
  const [dailyQuote, setDailyQuote] = useState('')

  // *For Menu Drawer
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const menuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

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
      if (notifications.length < notificationCount || notifications === '') {
        let token = localStorage.getItem('jwt')
        const { data } = await Service.getUserNotification(token);
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

  // *Socket 
  const getNotificationCount = () => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    console.log('file: header.js => line 136 => getNotificationCount => userData', userData);
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
      //console.log('file: header.js => line 137 => getNotificationCount => obj', obj);
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
    getNotificationCount();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid className="header" container spacing={0} item xs={12} sm={12} md={12} lg={12} justifyContent="space-around" alignItems="center">

      <Grid className="text-sm-center order-sm-2" item sm={12} md={8} lg={8}>
        <Hidden only={['md', 'lg', 'xl']}>
          <Typography component="h4">
            <CurrentDate />
          </Typography>
        </Hidden>
        <Typography component="h2">
          <span>Welcome </span><span className="text-color">To Your New Day!</span>
        </Typography>
        <div className="quote">
          <Typography component="p">{dailyQuote[0]?.quote} - {dailyQuote[0]?.author}</Typography>
          <div className="sponsored">
            <Typography component="span">Sponsored by</Typography>
            <Typography className="link" component="span" onClick={() => window.open(`/${dailyQuote[0]?.sponsor}`, '_blank')}>{dailyQuote[0]?.sponsor}</Typography>
          </div>
        </div>
      </Grid>

      <Grid className="order-sm-1" container spacing={0} item sm={12} md={4} lg={4} justifyContent="space-between" alignItems="center">
        <Hidden only={['md', 'lg', 'xl']}>
          <Grid item sm={2}>
            <IconButton className="menu-btn" size="medium" onClick={() => menuToggle()}>
              <Menu />
            </IconButton>
            {/* ========== Navigation ========== */}
            <Navigation open={mobileMenu} onClose={() => menuToggle()} />
          </Grid>
          <Grid className="text-sm-center" item sm={8}>
            <Logo />
          </Grid>
        </Hidden>
        <Grid className="text-right" item sm={2} md={12}>
          <Hidden only={['xs', 'sm']}>
            <Typography component="h4">
              <CurrentDate />
            </Typography>
          </Hidden>
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
                              <Grid item xs={2} sm={2} md={1}>
                                <div className="icon">
                                  <div className={notification.isRead === false ? "unread" : ""}></div>
                                  <Reminder />
                                </div>
                              </Grid>
                              <Grid item xs={10} sm={10} md={11}>
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

    </Grid >
  );
}

export default Header;