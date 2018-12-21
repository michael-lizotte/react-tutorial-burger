import * as actions from '../actions/actions';

const init = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.7,
    meat: 1.5,
    bacon: 1.0
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.igKey] : state.ingredients[action.igKey] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igKey]
            };
        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.igKey] : state.ingredients[action.igKey] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igKey]
            };
        case actions.SET_ERROR:
            return {
                ...state,
                error: true
            }
        case actions.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients
            }
        default:
            return state;
    }
}

export default reducer;