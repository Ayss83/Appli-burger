import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //récupération des clés des ingredients (viande, fromage, etc) avec méthode keys
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        //Crée un tableau de la longueur correspondant au nombre d'itération de l'ingrédient
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            //Retourne un ingredient avec clé unique et type correspondant à la propriété reçue
            return <BurgerIngredient key={ingKey + i} type={ingKey} />
        })
    })
    //Utilisation ensuite de la fonction reduce pour rassembler tous les tableaux ingrédients en un seul
    .reduce((arr, el)=> {
        return arr.concat(el)
    }, []);

    //si le tableau transformedIngredients est vide, il n'y a pas d'ingrédient, on retourne un message
    if (transformedIngredients.length===0) {
        transformedIngredients=<p>Commencez à ajouter des ingrédients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="painDessus" />
            {transformedIngredients}
            <BurgerIngredient type="painDessous" />
        </div>
    );
};

export default burger;