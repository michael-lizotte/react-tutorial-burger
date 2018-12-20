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
        purchasing: false,
        loading: false,
        error: false
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] + 1

        const price = this.state.totalPrice + INGREDIENT_PRICES[type]
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: price,
            purchasable: true
        });
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = this.state.ingredients[type] - 1
        
        const price = this.state.totalPrice - INGREDIENT_PRICES[type]
        let purchasable = false;

        for (let obj in updatedIngredients) {
            if (updatedIngredients[obj] > 0) {
                purchasable = true;
                break;
            }
        }
        

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: price,
            purchasable: purchasable
        });
    }

    onModalClosedHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    onModalContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.props.price);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
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
        let burger = this.state.error? <p>Ingredients couldn't be loaded!! :( &lt;/3"</p> : <Spinner />

        if (this.props.ings !== null) {
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
        // axios.get('https://react-tutorial-burger.firebaseio.com/ingredients.json').then(res => {
        //     this.setState({ingredients: res.data})
        // }).catch(error => {
        //     this.setState({error: true});
        // })
    }
}

const mapState = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatch = dispatch => {
    return {
        onAdd: (_igKey) => dispatch({type: actions.ADD_INGREDIENT, igKey: _igKey}),
        onRemove: (_igKey) => dispatch({type: actions.REMOVE_INGREDIENT, igKey: _igKey})
    };
}

export default connect(mapState, mapDispatch)(ErrorHandler(BurgerBuilder, axios));