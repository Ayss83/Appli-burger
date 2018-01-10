import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    //transformation du json reçu en array
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    //Parcours du array ingredients pour tous les ajouter au rendu
    const ingredientsFinaux = ingredients.map(ing => {
        return <span 
            key={ing.key}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>
                {ing.name} ({ing.amount})
            </span>;
    });

    return(
        <div className={classes.Order}>
            <p>Ingrédients: {ingredientsFinaux}</p>
            <p>Prix: <strong>{Number.parseFloat(props.price).toFixed(2)}€</strong></p>
        </div>
    )
};

export default order;