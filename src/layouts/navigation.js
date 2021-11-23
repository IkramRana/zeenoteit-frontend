import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Logo, MissionActive, MissionInactive, ThoughtInactive, SettingActive, LogoutInactive } from "assets/images/icons";
import { disabledInspect } from 'utils/index';
import useAuth from "hooks/useAuth";

import { Grid, Typography } from '@material-ui/core';

function Navigation() {

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
  );
}

export default Navigation;