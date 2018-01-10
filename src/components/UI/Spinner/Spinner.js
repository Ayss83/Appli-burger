import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => (
    <div className={classes.Loader}>
        Chargement en cours...
    </div>
);

export default spinner;