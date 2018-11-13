import React, { Component } from 'react';
import axios from '../../axios-order';

import Order from '../../components/Order/Order';
import ErrorHandler from '../../wrappers/ErrorHandler/ErrorHandler';

class Orders extends Component {
    state = {
        order: [],
        loading: true
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }

    componentDidMount() {
        axios.get('/orders.json').then((res) => {
            const fetchedOrders = [];
            for (let key in res) {
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