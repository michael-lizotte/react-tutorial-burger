import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const init = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    buildingBurger: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1.0
}

const addIngredient = (state, action) => {
    const updatedState = updateObject(state, {
        ingredients: updateObject(state.ingredients, {
            [action.igKey] : state.ingredients[action.igKey] + 1
        }),
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igKey],
        buildingBurger: true
    })
    return updatedState;
}

const removeIngredient = (state, action) => {
    const updatedState = updateObject(state, {
        ...state,
        ingredients: updateObject(state.ingredients, {
            [action.igKey] : state.ingredients[action.igKey] - 1
        }),
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igKey],
        buildingBurger: true
    })
    return updatedState;
}

const setIngredients = (state, action) => {
    let price = init.totalPrice;
    for (let ings in action.ingredients) {
        if (action.ingredients[ings] !== 0)
            price = price + INGREDIENT_PRICES[ings]
    }
    return updateObject(state, {
        ingredients: {
            bacon: action.ingredients.bacon,
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: price,
        buildingBurger: false
    })
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT: return addIngredient(state, action);            
        case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);            
        case actions.SET_ERROR: return updateObject(state, { error: true });
        case actions.SET_INGREDIENT: return setIngredients(state, action);            
        default:
            return state;
    }
}

export default reducer;