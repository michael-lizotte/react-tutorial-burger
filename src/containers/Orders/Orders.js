import React, { Component } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import ErrorHandler from '../../wrappers/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions'

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    render() {
        let orders = <Spinner />

        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => {
                        return <Order 
                                    key={order.id} 
                                    ingredients={order.ingredients}
                                    price={order.price}/>
                    })}
                </div>
            );
        }
        return orders;
    }

    componentDidMount() {
        this.props.onInit(this.props.token);
    }
}

const mapState = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatch = dispatch => {
    return {
        onInit: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapState, mapDispatch)(ErrorHandler(Orders, axios));