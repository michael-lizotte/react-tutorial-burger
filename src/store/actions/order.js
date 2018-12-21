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

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData).then(res => {
            dispatch(purchaseSuccess(res.data, orderData));
        }).catch (err => {
            dispatch(purchaseFailed(err));
        })
    }
}