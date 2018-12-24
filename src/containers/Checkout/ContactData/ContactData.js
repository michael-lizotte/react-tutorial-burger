import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../../wrappers/ErrorHandler/ErrorHandler';
import { validate } from '../../../utils/utils';

import * as actions from '../../../store/actions';

class contactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {
                    required: false
                },
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    }

    onInputChange = (event, inputId) => {
        const form = {
            ...this.state.orderForm
        }

        const formElement = {...form[inputId]}
        formElement.value = event.target.value;
        formElement.valid = validate(formElement.value, formElement.validation)
        formElement.touched = true;
        form[inputId] = formElement;

        let formIsValid = true;
        for (let inputIdentifier in form) {
            formIsValid = form[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: form, formIsValid: formIsValid})
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.user
        }
        this.props.onOrder(order, this.props.token);
    }

    render() {
        const formElArray = [];
        for (let key in this.state.orderForm) {
            formElArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <>
                <h4>Enter your contact data</h4>
                <form onSubmit={this.orderHandler}>
                    {/* <Input elementType="..." elementConfig="..." value="..."/> */}
                    {formElArray.map((element) => {
                        return <Input 
                                    key={element.id}
                                    elementType={element.config.elementType} 
                                    elementConfig={element.config.elementConfig}
                                    value={element.config.value}
                                    invalid={!element.config.valid}
                                    touched={element.config.touched}
                                    changed={(event) => this.onInputChange(event, element.id)}/>
                    })}
                    
                    <Button 
                        btnType="Success"
                        clicked={this.orderHandler}
                        disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
            </>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                {form}
            </div>
        );
    }
}

const mapState = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        user: state.auth.userId
    }
}

const mapDispatch = dispatch => {
    return {
        onOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapState, mapDispatch)(ErrorHandler(contactData, axios));