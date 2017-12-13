import React from 'react';

import WrapperHoc from '../../../hoc/WrapperHoc';

import Button from '../../UI/Button/Button';

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
        <p>Prix total : <strong>{props.price.toFixed(2)} €</strong></p>
        <p>Confirmer la commande?</p>
        <Button btnType="Danger" clicked={props.purchaseCanceled}>Annuler</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>Commander</Button>
    </WrapperHoc>)
};

export default orderSummary;