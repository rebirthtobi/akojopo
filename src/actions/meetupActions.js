import config from './../config/config';
import categoryDictionary from './../config/category';
import axios from 'axios';

export function fetchMeetupEvent(city, country_code, meetup_category) {
    let meetupUrl = `https://api.meetup.com/2/open_events?key=${config.MEETUP_API_KEY}&sign=true&photo-host=public&country=${country_code}&city=${city}&category=${meetup_category}&page=20`;
    
    return {
        type: "FETCH_MEETUP_EVENTS",
        payload: axios.get(meetupUrl, {
                    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
                })
    };
}

export function fetchMeetupByCategory(city, country_code, category) {
    let meetup_category = categoryDictionary[category].meetup;
    let meetupUrl = `https://api.meetup.com/2/open_events?key=${config.MEETUP_API_KEY}&sign=true&photo-host=public&country=${country_code}&city=${city}&category=${meetup_category}&page=20`;
    
    return {
        type: "FETCH_MEETUP_EVENTS",
        payload: axios.get(meetupUrl, {
                    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
                })
    };
}

export function fetchMeetupByLocation(city, country_code, meetup_category) {
    let meetupUrl = `https://api.meetup.com/2/open_events?key=${config.MEETUP_API_KEY}&sign=true&photo-host=public&country=${country_code}&city=${city}&category=${meetup_category}&page=20`;
    
    return {
        type: "FETCH_MEETUP_EVENTS",
        payload: axios.get(meetupUrl, {
                    headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
                })
    };
}