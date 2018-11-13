import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div style={{width: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                bntType='Danger'
                clicked>CANCEL</Button>
            <Button 
                bntType='Success'
                clicked>SUCCESS</Button>
        </div>
    );
}

export default checkoutSummary;