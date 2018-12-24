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

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const key = 'AIzaSyDJNCYbQEPFmYe3vayl33K0MtvOVadb1no';
        const url = isSignup ? 'signupNewUser' : 'verifyPassword';
        axios.post(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${url}?key=${key}`, authData)
            .then(res => {
                dispatch(authSuccess(res.data));
            }).catch(err => {
                dispatch(authFailed(err));
            });
    }
}