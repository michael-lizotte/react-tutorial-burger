import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    onCheckoutCancel = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ings !== null) {
            summary = (
                <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        onCheckoutCancel={this.onCheckoutCancel}
                        onCheckoutContinue={this.onCheckoutContinue}/>
                    <Route path={this.props.match.url + '/contact-data'} 
                        component={ContactData} />
                </div>
            )
        }
        return summary;
    }

    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;

        // for (let param of query.entries()) {
        //     if (param[0] === 'price') {
        //         price = param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }

        // this.setState({ingredients: ingredients, price: price})
    }
}

const mapState = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapState)(Checkout);