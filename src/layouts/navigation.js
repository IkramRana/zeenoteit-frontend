import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Logo, MissionActive, MissionInactive, ThoughtInactive, SettingActive, LogoutInactive } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import useAuth from "hooks/useAuth";

import { Grid, Typography } from '@material-ui/core';

function Navigation() {

  const { signout } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid className="navigation" container spacing={0} justifyContent="space-between" alignItems="flex-start">

      <Grid container spacing={0} item md={12} justifyContent="center" alignItems="center">

        <Grid item md={12}>
          <Logo />
        </Grid>

        <Grid item md={12}>
          <Typography component="ul">
            <NavLink to="/my-missions" activeClassName="active" >
              <div>
                {pathname === '/my-missions' ? <MissionActive /> : <MissionInactive />}
                <span>My Missions</span>
              </div>
            </NavLink>
            <NavLink to="/my-thoughts" activeClassName="active" >
              <div>
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
          <Typography component="li" onClick={signout}>
            <div>
              <LogoutInactive />
              <span>Logout</span>
            </div>
          </Typography>
        </Typography>
      </Grid>

    </Grid>
  );
}

export default Navigation;