import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        nom: '',
        email: '',
        adresse: {
            rue: '',
            codePostal: ''
        },
        loading: false
    }

    orderHandler = event => {
        event.preventDefault();
        //Passage en mode loading avant d'initier la requête
        this.setState({loading: true});

        //Infos commande et client qui seront envoyées au backend
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Renaud Moiselet",
                address: {
                    street: "34 Avenue de Tassigny",
                    postCode: "86530",
                    country: "France"
                },
                email: "renaud@gmail.com"
            },
            deliveryMethod: "express"
        }

        //Envoi de la requête puis fin du statut loading une fois la requête terminée
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                //Retourne à la page d'accueil
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (
        <div className={classes.ContactData}>
            <h4>Saisissez vos informations de contact</h4>
            <form>
                <input className={classes.Input} type="text" name="nom" placeholder="votre nom" />
                <input className={classes.Input} type="email" name="email" placeholder="votre adresse mail" />
                <input className={classes.Input} type="text" name="rue" placeholder="rue" />
                <input className={classes.Input} type="text" name="codePostal" placeholder="code postal" />
                <Button btnType="Success" clicked={this.orderHandler}>COMMANDER</Button>
            </form>
        </div>);

        if (this.state.loading) {
            form=<Spinner />
        }
        
        return (
            form
        );
    }
}

export default ContactData;