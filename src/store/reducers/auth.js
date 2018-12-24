import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const init = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case actions.AUTH_START : return updateObject(state, { error : null, loading : true});
        case actions.AUTH_SUCCESS : 
            return updateObject(state, {
                token : action.authData.idToken,
                userId : action.authData.localId,
                error : null,
                loading : false
            });
        case actions.AUTH_FAILED : 
            return updateObject(state, {
                error : action.error,
                loading : false
            });
        default : return state;
    }
}

export default reducer;