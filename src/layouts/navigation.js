import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import images from "assets/images/images";
import { disabledInspect } from 'utils/index';

import { Grid, Typography } from '@material-ui/core';
import useAuth from "hooks/useAuth";

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
          {images.logo}
        </Grid>

        <Grid item md={12}>
          <Typography component="ul">
            <Typography component="li" onClick={() => history.push('/my-missions')} >
              <div>
                {images.missionActive}
                <span>My Missions</span>
              </div>
            </Typography>
            <Typography component="li" onClick={() => history.push('/my-thoughts')}>
              <div>
                {images.thoughtInactive}
                <span>My Thoughts</span>
              </div>
            </Typography>
            <Typography component="li" onClick={() => history.push('/settings')} >
              <div>
                {images.settingActive}
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
              {images.logoutInactive}
              <span>Logout</span>
            </div>
          </Typography>
        </Typography>
      </Grid>

    </Grid>
  );
}

export default Navigation;