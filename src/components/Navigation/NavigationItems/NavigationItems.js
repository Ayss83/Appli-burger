import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

//Conteneur des composants menu
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Fabrique burger</NavigationItem>
        <NavigationItem link="/">Paiement</NavigationItem>
    </ul>
);

export default navigationItems;