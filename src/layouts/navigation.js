import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Images from "../assets/images";
import { disabledInspect } from '../utils/index';

import { Grid, Typography } from '@material-ui/core';

function Navigation() {

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('jwt');
    history.push('/login')
  }

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <Grid className="navigation" container spacing={0} justifyContent="space-between" alignItems="flex-start">

      <Grid container spacing={0} item md={12} justifyContent="center" alignItems="center">

        <Grid item md={12}>
          <img src={Images.logo} alt="zeNoteit" width="90px" />
        </Grid>

        <Grid item md={12}>
          <Typography component="ul">
            <Typography component="li" onClick={() => history.push('/my-missions')} >
              <div>
                <img src={Images.missionActive} />
                <span>My Missions</span>
              </div>
            </Typography>
            <Typography component="li" onClick={() => history.push('/my-thoughts')}>
              <div>
                <img src={Images.thoughtInactive} />
                <span>My Thoughts</span>
              </div>
            </Typography>
            <Typography component="li" onClick={() => history.push('/settings')} >
              <div>
                <img src={Images.settingActive} />
                <span>Settings</span>
              </div>
            </Typography>
          </Typography>
        </Grid>

      </Grid>

      <Grid item md={12}>
        <Typography component="ul">
          <Typography component="li" onClick={logout}>
            <div>
              <img src={Images.logoutInactive} />
              <span>Logout</span>
            </div>
          </Typography>
        </Typography>
      </Grid>

    </Grid>
  );
}

export default Navigation;