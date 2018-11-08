import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span></li>
        })
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.total.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button bntType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button bntType="Success" clicked={props.continue}>CONTINUE</Button>
        </>
    )
};

export default OrderSummary;