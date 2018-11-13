import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes good!</h1>
            <div style={{width: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                bntType='Danger'
                clicked={props.onCheckoutCancel}>CANCEL</Button>
            <Button 
                bntType='Success'
                clicked={props.onCheckoutContinue}>SUCCESS</Button>
        </div>
    );
}

export default checkoutSummary;