import React, { Component } from 'react';

import Aux from '../../hoc/WrapperHoc';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/errorHandler/errorHandler';

const PRIX_INGREDIENTS = {
    salade: 0.3,
    fromage: 0.4,
    viande: 1.8,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 2,
        achetable: false,
        modeAchat: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get("https://react-my-burger-8de01.firebaseio.com/ingredients.json")
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
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

    purchaseCancelHandler = () => {
        this.setState({modeAchat: false});
    }

    purchaseContinueHandler = () => {
        
        const params = [];

        for (let ingredient in this.state.ingredients) {
            params.push(encodeURIComponent(ingredient) + "=" + encodeURIComponent(this.state.ingredients[ingredient]));
        }
        params.push('price=' + this.state.totalPrice);
        const query = params.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + query
        });
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

        //Initialisation à null pour éviter une erreur à cause du traitement asynchrone de state.ingredients
        let orderSummary = null;

        if(this.state.ingredients) {
            orderSummary = <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
        }

        //Modification de la variable orderSummary pour afficher le spinner si le chargement est en cours
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        //Affichage initial, spinner si requête ok ou message d'erreur en cas d'erreur
        let burger = this.state.error ? <p>Erreur de chargement des ingrédients</p> : <Spinner />

        //Changement de la variable burger pour affichage du constructeur de burger si les ingrédients ont bien été rajouté au state
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        achetable={this.state.achetable}
                        disabled={disabledInfo}
                        clicked={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            )
        }

        return(
            <Aux>
                <Modal show={this.state.modeAchat} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

//Utilisation du hoc de gestion d'erreur
export default errorHandler(BurgerBuilder, axios);