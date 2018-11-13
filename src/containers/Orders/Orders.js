import React, { Component } from 'react';
import axios from '../../axios-order';

import Order from '../../components/Order/Order';
import ErrorHandler from '../../wrappers/ErrorHandler/ErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order 
                                key={order.id} 
                                ingredients={order.ingredients}
                                price={order.price}/>
                })}
            </div>
        );
    }

    componentDidMount() {
        axios.get('/orders.json').then((res) => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            console.log(fetchedOrders);
            this.setState({loading:false, orders: fetchedOrders})
        }).catch((err) => {
            this.setState({loading:false})
        })
    }
}

export default ErrorHandler(Orders, axios);