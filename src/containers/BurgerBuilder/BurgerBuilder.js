import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../wrappers/ErrorHandler/ErrorHandler';
import axios from '../../axios-order';

import * as actions from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1.0
}

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    }

    checkPurchasable = (type) => {
        let purchasable = false;
        for (let obj in this.props.ings) {
            if (this.props.ings[obj] > 0) {
                purchasable = true;
                break;
            }
        }
        
        if (purchasable != this.state.purchasable) {
            this.setState({
                purchasable: purchasable
            });
        }
    }

    onModalClosedHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    onModalContinueHandler = () => {
        // const queryParams = [];

        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.price);

        // const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout'
            // search: '?' + queryString
        });
    }

    purchasableHandler = (isPurchasable) => {
        this.setState({
            purchasable: isPurchasable
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error? <p>Ingredients couldn't be loaded!! :( &lt;/3"</p> : <Spinner />

        if (this.props.ings !== null) {
            this.checkPurchasable();
            burger = (
                <>
                    <Burger ingredients={this.props.ings} purchasable={this.purchasableHandler}/>
                    <BuildControls 
                        add={this.props.onAdd}
                        remove={this.props.onRemove}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}/>
                </>
            );
            orderSummary = <OrderSummary 
                                    ingredients={this.props.ings} 
                                    cancel={this.onModalClosedHandler} 
                                    continue={this.onModalContinueHandler}
                                    total={this.props.price}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.onModalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}                
            </>
        );
    }

    componentDidMount () {
        this.props.onInit();
    }
}

const mapState = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}

const mapDispatch = dispatch => {
    return {
        onAdd: (_igKey) => dispatch(actions.addIngredient(_igKey)),
        onRemove: (_igKey) => dispatch(actions.removeIngredient(_igKey)),
        onInit: () => dispatch(actions.initIngredients())
    };
}

export default connect(mapState, mapDispatch)(ErrorHandler(BurgerBuilder, axios));