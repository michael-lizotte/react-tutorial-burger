import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class contactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code',
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false,
    }

    onInputChange = (event, inputId) => {
        const form = {
            ...this.state.orderForm
        }

        const formElement = {...form[inputId]}
        formElement.value = event.target.value;
        form[inputId] = formElement;

        this.setState({orderForm: form})
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading:true});

        const formData = {};
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({
                loading:false,
                purchasing: false
            });
            this.props.history.push('/');
        });
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
                                    changed={(event) => this.onInputChange(event, element.id)}/>
                    })}
                    <Button 
                        bntType="Success"
                        clicked={this.orderHandler}>ORDER</Button>
                </form>
            </>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                {form}
            </div>
        );
    }
}

export default withRouter(contactData)