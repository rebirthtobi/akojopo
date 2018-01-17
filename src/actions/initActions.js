import * as jwt from 'jsonwebtoken';
import config from './../config/config';
import axios from 'axios';

export function checkAuthentication() {
    if (typeof localStorage.getItem('akojopo-lg') !== "undefined") {
        let localToken = localStorage.getItem('akojopo-lg');
        if (localToken) {
            let token = JSON.parse(localToken);
            jwt.verify(token, config.AUTH_SECRET_KEY, function(err, decoded) { 
                if (err) {
                    localStorage.removeItem('akojopo-lg');
                    return {
                        type: "CHECKED_AUTH",
                        payload: {
                            'checked': true,
                            'valid': false
                        }
                    };  
                } else {
                    let renewUrl = config.RENEW_URL;  
                    return {
                        type: "TOKEN_RENEW",
                        payload: axios.post(renewUrl, {
                            decoded: decoded
                        })
                    };
                }
            });
            return {
                type: "CHECKED_AUTH",
                payload: {
                    'checked': true,
                    'valid': false
                }
            }; 
        } else {
            return {
                type: "CHECKED_AUTH",
                payload: {
                    'checked': true,
                    'valid': false
                }
            };
        }
    } else {
        return {
            type: "CHECKED_AUTH",
            payload: {
                'checked': true,
                'valid': false
            }
        };
    }
}