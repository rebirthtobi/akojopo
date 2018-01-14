import defaultState from './../config/default';

export default function authentication (state = defaultState.auth, action) {
    switch (action.type){
        case "USER_REGISTRATION_PENDING": {
            return {
                ...state,
                loading: true,
                error: false,
                auth: false,
                message: null
            };
        }
        case "USER_REGISTRATION_REJECTED": {
            let response = action.payload;

            return {
                ...state,
                loading: false,
                error: true,
                auth: false,
                message: response.error
            };
        }
        case "USER_REGISTRATION_FULFILLED": {
            let response = action.payload;

            if (response.status == 201) {
                localStorage.setItem('akojopo-lg', JSON.stringify(response.token));
                return {
                    ...state,
                    loading: false,
                    error: false,
                    auth: true,
                    message: response.data.success
                };
            } else if (response.status == 202) {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    auth: false,
                    message: response.data.error
                };
            }
            break;       
        }
        case "USER_LOGIN_PENDING": {
            return {
                ...state,
                loading: true,
                error: false,
                auth: false,
                message: null
            };
        }
        case "USER_LOGIN_REJECTED": {
            return {
                ...state,
                loading: false,
                error: true,
                auth: false,
                message: "User details incorrect"
            };
        }
        case "USER_LOGIN_FULFILLED": {
            let response = action.payload;

            if (response.status == 202) {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    auth: false,
                    message: response.data.error
                };
            } else {                
                localStorage.setItem('akojopo-lg', JSON.stringify(response.data.token));
                
                return {
                    ...state,
                    loading: false,
                    error: false,
                    auth: true,
                    message: response.data.success
                };
            }                
        }
        case "CHECKED_AUTH": {
            let payload = action.payload;
            return {
                ...state,
                check: payload.checked,
                loading: false,
                error: false,
                auth: payload.valid,
                message: null
            };
        }
        case "TOKEN_RENEW_REJECTED": {
            return {
                ...state,
                check: true
            };
        }
        case "TOKEN_RENEW_FULFILLED": {
            let response = action.payload;            
            localStorage.setItem('akojopo-lg', JSON.stringify(response.token));
            
            return {
                ...state,
                check: true,
                loading: false,
                error: false,
                auth: true,
                message: null
            }; 
        }
        case "USER_LOGOUT": {
            return {
                loading: false,
                error: false,
                auth: false,
                message: null,
                check: false
            };
        }
        default: {
            return state;
        }
    }
}