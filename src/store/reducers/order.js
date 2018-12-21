import * as actions from '../actions/actions';

const init = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = init, action) => {
    switch(action.type){
        case actions.PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
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
        case actions.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        default: return state;
    }
}

export default reducer;