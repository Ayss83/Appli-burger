import React, { Component } from 'react';

import classes from './BurgerIngredient.css';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (prop.type) {
        case ('painDessous'):
            ingredient = <div className={classes.PainDessous}></div>;
            break;
        case ('painDessus'):
            ingredient = (
                <div className={classes.painDessus}>
                    <div className={classes.Graines1}></div>
                    <div className={classes.Graines2}></div>
                </div>
            );
            break;
        case ('viande'):
            ingredient= <div className={classes.Viande}></div>;
            break;
        case ('salade'):
            ingredient= <div className={classes.Salade}></div>;
            break;
        case ('fromage'):
            ingredient= <div className={classes.Fromage}></div>;
            break;
        case ('bacon'):
            ingredient= <div className={classes.Bacon}></div>;
            break;
        default:
            ingredient=null;
    }

    return ingredient;
};

export default burgerIngredient;