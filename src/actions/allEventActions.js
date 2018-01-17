import config from './../config/config';
import categoryDictionary from './../config/category';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

export function fetchEvent(city, country_code, country_name, meetup_category, eventbrite_category) {
    let meetupUrl = `https://api.meetup.com/2/open_events?and_text=False&country=${country_code}&offset=0&city=${city}&format=json&limited_events=False&photo-host=public&page=20&radius=25.0&category=34&desc=False&status=upcoming&sig_id=226427091&sig=c2a2d4756e5bfadc587420d978e9129fa0e2bc5d`;
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTS",
        payload: axios.all([
            axios({
                url: meetupUrl,
                adapter: jsonpAdapter
            }),
            axios.get(eventbriteUrl)
        ])
    };
}

export function fetchByCategory(city, country_code, country_name, category) {
    let meetup_category = categoryDictionary[category].meetup;
    let eventbrite_category = categoryDictionary[category].eventbrite;
    let meetupUrl = `https://api.meetup.com/2/open_events?key=${config.MEETUP_API_KEY}&sign=true&photo-host=public&country=${country_code}&city=${city}&category=${meetup_category}&page=20`;
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTS",
        payload: axios.all([
            axios.get(meetupUrl, {
                headers: { "Access-Control-Allow-Origin": "https://akojopo.herokuapp.com" }
            }),
            axios.get(eventbriteUrl)
        ])
    };
}

export function fetchByLocation(city, country_code, country_name, meetup_category, eventbrite_category) {
    let meetupUrl = `https://api.meetup.com/2/open_events?key=${config.MEETUP_API_KEY}&sign=true&photo-host=public&country=${country_code}&city=${city}&category=${meetup_category}&page=20`;
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTS",
        payload: axios.all([
            axios.get(meetupUrl, {
                headers: { "Access-Control-Allow-Origin": "https://akojopo.herokuapp.com" }
            }),
            axios.get(eventbriteUrl)
        ])
    };
}