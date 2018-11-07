import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1.0
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.onModalClosedHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        cancel={this.onModalClosedHandler} 
                        continue={this.onModalContinueHandler}
                        total={this.state.totalPrice}/>
                </Modal>
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
    }
}

export default BurgerBuilder;