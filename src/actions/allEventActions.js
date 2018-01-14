import config from './../config/config';
import categoryDictionary from './../config/category';
import axios from 'axios';

export function fetchEvent(city, country_code, country_name, meetup_category, eventbrite_category) {
    let meetupUrl = `https://api.meetup.com/2/open_events?key=${config.MEETUP_API_KEY}&sign=true&photo-host=public&country=${country_code}&city=${city}&category=${meetup_category}&page=20`;
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTS",
        payload: axios.all([
            axios.get(meetupUrl, {
                headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
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
                headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
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
                headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
            }),
            axios.get(eventbriteUrl)
        ])
    };
}