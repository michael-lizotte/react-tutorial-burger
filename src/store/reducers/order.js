import * as actions from '../actions/actions';

const init = {
    orders: [],
    loading: false
}

const reducer = (state = init, action) => {
    switch(action){
        case actions.PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.concat({...action.orderData, id:action.orderId})
            };
        case actions.PURCHASE_FAILED:
            return {
                ...state,
                loading: false
            };
        case actions.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
}

export default reducer;