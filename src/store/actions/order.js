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

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData).then(res => {
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

export const fetchOrderSuccess = (orders) => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actions.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const params = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + params)
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders));
            }).catch((err) => {
                dispatch(fetchOrderFailed(err));
            })
    }
}