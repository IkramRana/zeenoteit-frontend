import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { EditQuote, Notification } from "assets/images/icons";
import { disabledInspect, CurrentDate } from 'utils/index';
import { Service } from "config/service";

import { ClickAwayListener, Grid, Grow, IconButton, MenuList, Paper, Popper, Tooltip, Typography, withStyles, } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// *Import Dialog Component
import DailyQuote from "components/daily-quote";

const QuoteToolTip = withStyles({
  tooltip: {
    fontSize: "12px",
    fontFamily: "Avenir",
    color: "#58595B",
    backgroundColor: "transparent",
    marginTop: "4px"
  }
})(Tooltip);

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
      const { message } = await Service.addDailyQuote(obj);
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
      console.log('file: header.js => line 40 => dialogCloseHandler => error', error)
    }
  }

  // *Get Daily Quote
  const getDailyQuote = async () => {
    try {
      const { data } = await Service.getDailyQuote();
      setDailyQuote(data[0])
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

      {/* ========== Add Daily Quote Dialog ========== */}
      <DailyQuote open={openDialog} onClose={() => { dialogHandler(false) }} addDailyQuote={addDailyQuote} />

      <Grid item md={8}>
        <Typography component="h2">
          <span>Welcome </span><span className="text-color">To Your New Day!</span>
        </Typography>
        <div className="quote">
          <Typography component="p">{dailyQuote.quote} - {dailyQuote.author}</Typography>
          <div className="sponsored">
            <Typography component="span">Sponsored by</Typography>
            <Typography className="link" component="span" onClick={() => history.push(`/${dailyQuote.sponsor}`)}>{dailyQuote.sponsor}</Typography>
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
        <IconButton className="notification" size="medium" ref={notifyDropdown} onClick={() => { notificationHandler(true) }}>
          <Notification />
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