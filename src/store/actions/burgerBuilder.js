import * as actions from './actions';

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