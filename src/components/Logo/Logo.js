import React from 'react';

import imgLogo from '../../assets/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={imgLogo} />
    </div>
);

export default logo;