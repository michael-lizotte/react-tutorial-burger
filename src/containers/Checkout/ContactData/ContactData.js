import React, { Component } from 'react';
import axios from '../../../axios-order';

import Button from '../../../components/UI/Button/Button';

import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class contactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
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
        });
    }

    render() {
        let form = (
            <>
                <h4>Enter your contact data</h4>
                <form>
                    <input className="Input" type="text" name="name" placeholder="Your name"/>
                    <input className="Input" type="email" name="email" placeholder="Your email"/>
                    <input className="Input" type="text" name="street" placeholder="Your street"/>
                    <input className="Input" type="text" name="postal" placeholder="Your postal code"/>
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

export default contactData