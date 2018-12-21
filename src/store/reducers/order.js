import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const init = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat({...action.orderData, id : action.orderId})
    });
}

const reducer = (state = init, action) => {
    switch(action.type){
        case actions.PURCHASE_SUCCESS: return purchaseSuccess(state, action);           
        case actions.PURCHASE_FAILED: return updateObject(state, { loading : false });
        case actions.PURCHASE_BURGER_START: return updateObject(state, { loading : true});
        case actions.PURCHASE_INIT: return updateObject(state, { purchased : false });
        case actions.FETCH_ORDERS_START: return updateObject(state, { loading : true });
        case actions.FETCH_ORDERS_SUCCESS: return updateObject(state, { orders : action.orders, loading : false });
        case actions.FETCH_ORDERS_FAILED: return updateObject(state, { loading : false });
        default: return state;
    }
}

export default reducer;