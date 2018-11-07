import React from 'react';

import './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />
            }) 
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (ingredientsArray.length === 0) {
        ingredientsArray = <p>Please add ingredients</p>
    }
    
    return (
        <div className="Burger">
            <BurgerIngredients type="bread-top" />
            {ingredientsArray}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;