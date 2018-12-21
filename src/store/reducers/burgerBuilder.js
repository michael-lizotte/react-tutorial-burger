import * as actions from '../actions/actions';

const init = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
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
        default:
            return state;
    }
}

export default reducer;