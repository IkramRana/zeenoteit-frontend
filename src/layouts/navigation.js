import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Logo, MissionActive, ThoughtInactive, SettingActive, LogoutInactive } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import useAuth from "hooks/useAuth";

import { Grid, Typography } from '@material-ui/core';

function Navigation() {

  const { signout } = useAuth();

  const history = useHistory();

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
            <Typography component="li" onClick={() => history.push('/my-missions')} >
              <div>
                <MissionActive />
                <span>My Missions</span>
              </div>
            </Typography>
            <Typography component="li" onClick={() => history.push('/my-thoughts')}>
              <div>
                <ThoughtInactive />
                <span>My Thoughts</span>
              </div>
            </Typography>
            <Typography component="li" onClick={() => history.push('/settings')} >
              <div>
                <SettingActive />
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