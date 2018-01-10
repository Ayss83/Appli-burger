import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

//Conteneur des composants menu
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Fabrique burger</NavigationItem>
        <NavigationItem link="/orders">Commandes</NavigationItem>
    </ul>
);

export default navigationItems;