import * as actions from './actions';
import axios from '../../axios-order';

export const addIngredient = (_igKey) => {
    return {
        type: actions.ADD_INGREDIENT,
        igKey: _igKey
    };
};

export const removeIngredient = (_igKey) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        igKey: _igKey
    };
};

export const setIngredients = (ings) => {
    return {
        type: actions.SET_INGREDIENT,
        ingredients: ings
    }
}

export const setError = (err) => {
    return {
        type: actions.SET_ERROR,
        error: err
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-tutorial-burger.firebaseio.com/ingredients.json').then(res => {
            dispatch(setIngredients(res.data));
        }).catch(error => {
            dispatch(setError(error));
        })
    }
}