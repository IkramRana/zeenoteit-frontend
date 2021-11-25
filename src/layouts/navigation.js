import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Logo, MissionActive, MissionInactive, ThoughtInactive, SettingActive, LogoutInactive } from "assets/images/icons";
import { disabledInspect, Responsive } from 'utils/index';
import useAuth from "hooks/useAuth";

import { Grid, Typography, Hidden, Drawer, IconButton, useMediaQuery } from '@material-ui/core';
import { Close } from "@material-ui/icons";

function Navigation(props) {

  const isMobile = useMediaQuery(Responsive.isMobile);
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
            <NavLink to="/my-missions" activeClassName="active" onMouseOver={() => hoverActive('/my-missions')} onMouseOut={() => hoverActive('')}>
              <div>
                {/* {isActive === '/my-missions' &&
                  <MissionActive />
                }
                {isActive === '' &&
                  <MissionInactive />
                } */}
                {/* {pathname === '/my-missions' ? <MissionActive /> : <span>
                  {pathname === '/my-thoughts' ? <ThoughtInactive /> : <ThoughtInactive />}
                </span>} */}
                {pathname === '/my-thoughts' ? <MissionInactive /> : <MissionActive />}
                <span>My Missions</span>
              </div>
            </NavLink>
            <NavLink to="/my-thoughts" activeClassName="active" onMouseOver={() => hoverActive('/my-thoughts')} onMouseOut={() => hoverActive('')}>
              <div>
                {/* {pathname === '/my-thoughts' ? <ThoughtInactive /> : <ThoughtInactive />} */}
                {/* {isActive === '/my-thoughts' &&
                  < MissionActive />
                }
                {isActive === '' &&
                  <span>
                    {pathname === '/my-thoughts' ? <ThoughtInactive /> : <ThoughtInactive />}
                  </span>
                } */}
                {pathname === '/my-thoughts' ? <ThoughtInactive /> : <ThoughtInactive />}
                <span>My Thoughts</span>
              </div>
            </NavLink>
            <NavLink to="/settings" activeClassName="active" >
              <div>
                {pathname === '/settings' ? <SettingActive /> : <SettingActive />}
                <span>Settings</span>
              </div>
            </NavLink>
          </Typography>
        </Grid>

      </Grid>

      <Grid item md={12}>
        <Typography component="ul">
          <Typography component="li" onClick={() => logout()}>
            <div>
              <LogoutInactive />
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