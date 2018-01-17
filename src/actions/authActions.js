import config from './../config/config';
import axios from 'axios';
import * as crypto from 'crypto-js';

export function login(email, password) {
    let loginUrl = config.LOGIN_URL;
    let encryptedPassword = crypto.AES.encrypt(password, config.ENCRYPTION_KEY).toString();
    return {
        type: "USER_LOGIN",
        payload: axios.post(loginUrl, {
            email,
            password: encryptedPassword
        })
    };
}

export function register(name, email, password, country, city) {
    let registrationUrl = config.REGISTRATION_URL;    
    let encryptedPassword = crypto.AES.encrypt(password, config.ENCRYPTION_KEY).toString();

    return {
        type: "USER_REGISTRATION",
        payload: axios.put(registrationUrl, {
                name,
                email,
                password: encryptedPassword,
                country,
                city
            })
    };
}

export function logout() {
    if (typeof localStorage.getItem('akojopo-lg') !== "undefined") {
        let token = JSON.parse(localStorage.getItem('akojopo-lg'));
        if (token) {
            localStorage.removeItem('akojopo-lg');
        }
    }
    
    return {
        type: "USER_LOGOUT",
        payload: {
            'auth': false
        }
    };
}