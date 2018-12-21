import axios from 'axios';

import * as actions from './actions';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const key = 'AIzaSyDJNCYbQEPFmYe3vayl33K0MtvOVadb1no';
        axios.post(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res));
            }).catch(err => {
                console.log(err);
                dispatch(authFailed(err));
            });
    }
}