import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Logo, MissionActive, MissionInactive, ThoughtActive, ThoughtInactive, SettingActive, SettingInactive, LogoutActive, LogoutInactive } from "assets/images/icons";
import { disabledInspect, Responsive } from 'utils/index';
import useAuth from "hooks/useAuth";

import { Grid, Typography, Hidden, Drawer, IconButton, useMediaQuery } from '@material-ui/core';
import { Close } from "@material-ui/icons";

function Navigation(props) {

  const isTablet = useMediaQuery(Responsive.isTablet);

  const { open, onClose } = props

  const { signout } = useAuth();
  const { pathname } = useLocation();

  const [isActive, setIsActive] = useState()

  const hoverActive = (route) => {
    setIsActive(route)
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userData')
    signout()
  }

  const sideMenu = (
    <Grid className="navigation" container spacing={0} justifyContent={isTablet ? 'center' : 'space-between'} alignItems="flex-start">

      <Hidden only={['md', 'lg', 'xl']}>
        <Grid item md={12}>
          <IconButton className="menu-btn" size="medium" onClick={() => { onClose() }}>
            <Close />
          </IconButton>
        </Grid>
      </Hidden>

      <Grid container spacing={0} item md={12} justifyContent="center" alignItems="center">

        <Hidden only={['xs', 'sm']}>
          <Grid item md={12}>
            <Logo />
          </Grid>
        </Hidden>

        <Grid item md={12}>
          <Typography component="ul">
            <NavLink to="/my-missions" activeclassname="active" onMouseOver={() => hoverActive('my-missions')} onMouseOut={() => hoverActive('')}>
              <div>
                {pathname === '/my-missions' &&
                  <MissionActive />
                }
                {pathname !== '/my-missions' &&
                  <span>
                    {isActive === 'my-missions' ? <MissionActive /> : <MissionInactive />}
                  </span>
                }
                <span>My Missions</span>
              </div>
            </NavLink>
            <NavLink to="/my-thoughts" activeclassname="active" onMouseOver={() => hoverActive('my-thoughts')} onMouseOut={() => hoverActive('')}>
              <div>
                {pathname === '/my-thoughts' &&
                  <ThoughtActive />
                }
                {pathname !== '/my-thoughts' &&
                  <span>
                    {isActive === 'my-thoughts' ? <ThoughtActive /> : <ThoughtInactive />}
                  </span>
                }
                <span>My Thoughts</span>
              </div>
            </NavLink>
            <NavLink to="/settings" activeclassname="active" onMouseOver={() => hoverActive('settings')} onMouseOut={() => hoverActive('')}>
              <div>
                {pathname === '/settings' &&
                  <SettingActive />
                }
                {pathname !== '/settings' &&
                  <span>
                    {isActive === 'settings' ? <SettingActive /> : <SettingInactive />}
                  </span>
                }
                <span>Settings</span>
              </div>
            </NavLink>
          </Typography>
        </Grid>

      </Grid>

      <Grid item md={12}>
        <Typography component="ul">
          <Typography activeclassname="active" component="li" onMouseOver={() => hoverActive('logout')} onMouseOut={() => hoverActive('')} onClick={() => logout()}>
            <div>
              {isActive === 'logout' ? <LogoutActive /> : <LogoutInactive />}
              <span>Logout</span>
            </div>
          </Typography>
        </Typography>
      </Grid>

    </Grid>
  )

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid id="SideNavigation" item md={2}>
      <Hidden only={['md', 'lg', 'xl']}>
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {sideMenu}
        </Drawer>
      </Hidden>
      <Hidden only={['xs', 'sm']}>
        {sideMenu}
      </Hidden>
    </Grid>
  );
}

export default Navigation;