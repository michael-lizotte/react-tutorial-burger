import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../wrappers/ErrorHandler/ErrorHandler';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1.0
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
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
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Michael',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '43212',
                    country: 'canada'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fast'
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({
                loading:false,
                purchasing: false
            });
        }).catch(err => {
            this.setState({
                loading:false,
                purchasing: false
            });
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
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error? <p>Ingredients couldn't be loaded!! :( &lt;/3"</p> : <Spinner />

        if (this.state.ingredients !== null) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} purchasable={this.purchasableHandler}/>
                    <BuildControls 
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        purchase={this.purchaseHandler}/>
                </>
            );
            orderSummary = <OrderSummary 
                                    ingredients={this.state.ingredients} 
                                    cancel={this.onModalClosedHandler} 
                                    continue={this.onModalContinueHandler}
                                    total={this.state.totalPrice}/>
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
        axios.get('https://react-tutorial-burger.firebaseio.com/ingredients.json').then(res => {
            this.setState({ingredients: res.data})
        }).catch(error => {
            this.setState({error: true});
        })
    }
}

export default ErrorHandler(BurgerBuilder, axios);