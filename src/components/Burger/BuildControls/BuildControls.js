import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salade', type: 'salade'},
    { label: 'Fromage', type: 'fromage'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Viande', type: 'viande'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Prix : <strong>{props.price.toFixed(2)} €</strong></p>
        {controls.map (control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]} />
        ))}
        <button className={classes.OrderButton}
            onClick={props.clicked}
            disabled={!props.achetable}>
                COMMANDER
            </button>
    </div>
)

export default buildControls;