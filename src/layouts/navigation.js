import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Logo, MissionActive, MissionInactive, ThoughtInactive, SettingActive, LogoutInactive } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import useAuth from "hooks/useAuth";

import { Grid, Typography } from '@material-ui/core';

var isActive = '/my-missions';

function Navigation() {

  const { signout } = useAuth();
  const history = useHistory();

  const activeHandler = (route) => {
    isActive = route
    history.push(route)
  }

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
            <Typography component="li" className={isActive === '/my-missions' ? 'active' : ''} onClick={() => { activeHandler('/my-missions') }} >
              <div>
                {isActive === '/my-missions' ? <MissionActive /> : <MissionInactive />}
                <span>My Missions</span>
              </div>
            </Typography>
            <Typography component="li" className={isActive === '/my-thoughts' ? 'active' : ''} onClick={() => { activeHandler('/my-thoughts') }}>
              <div>
                {isActive === '/my-thoughts' ? <ThoughtInactive /> : <ThoughtInactive />}
                <span>My Thoughts</span>
              </div>
            </Typography>
            <Typography component="li" className={isActive === '/settings' ? 'active' : ''} onClick={() => { activeHandler('/settings') }} >
              <div>
                {isActive === '/settings' ? <SettingActive /> : <SettingActive />}
                <span>Settings</span>
              </div>
            </Typography>
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