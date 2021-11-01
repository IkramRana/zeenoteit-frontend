import React, { useEffect, useState } from "react";
import Images from "../assets/images";

import { disabledInspect } from '../utils/index';

import { Grid, Link, Typography } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';

function Thoughts() {

  useEffect(() => {
    disabledInspect();
    window.scrollTo({ top: 0 });
  }, [])

  return (
    <div>

    </div>
  );
}

export default Thoughts;