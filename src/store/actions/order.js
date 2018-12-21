import * as actions from './actions';
import axios from '../../axios-order';

export const purchaseSuccess = (id, data) => {
    return {
        type: actions.PURCHASE_SUCCESS,
        orderId: id,
        orderData: data
    }
}

export const purchaseFailed = (_error) => {
    return {
        type: actions.PURCHASE_FAILED,
        error: _error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actions.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData).then(res => {
            dispatch(purchaseSuccess(res.data.name, orderData));
        }).catch (err => {
            dispatch(purchaseFailed(err));
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT
    }
}