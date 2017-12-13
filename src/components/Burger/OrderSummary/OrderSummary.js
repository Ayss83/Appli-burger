import React from 'react';

import WrapperHoc from '../../../hoc/WrapperHoc';

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => {
        return <li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey}</span> : {props.ingredients[ingKey]}
                </li>;
    })
    
    return(
    <WrapperHoc>
        <h3>Votre commande</h3>
        <p>Voici la liste des ingrédients que vous avez rajouté à votre burger : </p>
        <ul>
            {ingredientSummary}
        </ul>
        <p>Confirmer la commande?</p>
    </WrapperHoc>)
};

export default orderSummary;