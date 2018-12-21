import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes good!</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType='Danger'
                clicked={props.onCheckoutCancel}>CANCEL</Button>
            <Button 
                btnType='Success'
                clicked={props.onCheckoutContinue}>ORDER</Button>
        </div>
    );
}

export default checkoutSummary;