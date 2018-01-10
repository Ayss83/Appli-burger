import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state= {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        //Récupération des paramètres de l'url dans une variable
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    //Méthode de retour à la page précédente en cas d'annulation pendant la confirmation de commande
    orderCancelHandler = () => {
        this.props.history.goBack();
    }

    //Méthode associée au bouton de confirmation de commande
    orderPlaceHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    orderCancel={this.orderCancelHandler}
                    orderPlace={this.orderPlaceHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;