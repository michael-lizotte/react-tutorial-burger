import axios from 'axios';

import * as actions from './actions';
import { config_db } from '../../config/config';

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

export const checkTokenState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) dispatch(logout());
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({idToken : token, localId : userId}));
                dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const checkTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actions.AUTH_LOGOUT
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
        const key = config_db['firebase_api_key']
        const url = isSignup ? 'signupNewUser' : 'verifyPassword';
        axios.post(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${url}?key=${key}`, authData)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', new Date((new Date().getTime() + res.data.expiresIn * 1000)));
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data));
                dispatch(checkTimeout(res.data.expiresIn));
            }).catch(err => {
                dispatch(authFailed(err.response.data.error));
            });
    }
}