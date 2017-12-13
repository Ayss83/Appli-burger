import React, { Component } from 'react';

import Aux from '../../hoc/WrapperHoc';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRIX_INGREDIENTS = {
    salade: 0.3,
    fromage: 0.4,
    viande: 1.8,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salade: 0,
            bacon: 0,
            fromage: 0,
            viande: 0
        },
        totalPrice: 2,
        achetable: false,
        modeAchat: false,
    }

    //Méthode de mise à jour du statut disabled du bouton Commander
    updateAchetableState (ingredients) {
        //Récupération des clés (salade, viande,...) avec la méthode keys
        const somme = Object.keys(ingredients)
        .map(ingKey => {
            return ingredients[ingKey];     //Récupération des valeurs (les quantités)
        })
        .reduce((sum, el) => {              //Utilisation de reduce pour obtenir le nombre total d'ingrédient
            return sum + el;
        }, 0);
        this.setState({achetable: somme>0}) //Si le nombre total d'ingrédients est supérieur à 0, le bouton n'est pas désactivé
    }

    //Méthode d'ajout d'un ingrédient (ajout au compteur dans le state et calcul du prix)
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = PRIX_INGREDIENTS[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updateAchetableState(updatedIngredients);
    }

    //Méthode de retrait d'un ingrédient (inverse de la méthode d'ajout avec en plus une vérification de la présence d'ingrédient à retirer)
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount>=1)
        {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = PRIX_INGREDIENTS[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updateAchetableState(updatedIngredients);
        }
        else {

        }
    }

    purchaseHandler = () => {
        this.setState({modeAchat: true});
    }

    render() {
        //Copie de l'objet state.ingredients
        const disabledInfo = {
            ...this.state.ingredients
        };

        //Parcours de la copie avec une boucle
        for (let key in disabledInfo) {
            //Remplacement de la valeur de chaque ingrédient par le résultat de la comparaison logique : valeur <=0
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal show={this.state.modeAchat}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    achetable={this.state.achetable}
                    disabled={disabledInfo}
                    clicked={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;