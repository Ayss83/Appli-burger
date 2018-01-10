import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/errorHandler/errorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            const dbOrders = []
            for (let key in res.data) {
                dbOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({orders: dbOrders, loading: false})
        })
        .catch(err => {
            this.setState({loading: false})            
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default errorHandler(Orders, axios);