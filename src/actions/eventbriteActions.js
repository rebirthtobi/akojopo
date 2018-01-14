import config from './../config/config';
import categoryDictionary from './../config/category';
import axios from 'axios';

export function fetchEventbriteEvent(country_name, eventbrite_category) {
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTBRITE_EVENTS",
        payload: axios.get(eventbriteUrl)
    };
}

export function fetchEventbriteByCategory(country_name, category) {
    let eventbrite_category = categoryDictionary[category].eventbrite;
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTBRITE_EVENTS",
        payload: axios.get(eventbriteUrl)
    };
}

export function fetchEventbriteByLocation(country_name, eventbrite_category) {
    let eventbriteUrl = `https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=${country_name}&categories=${eventbrite_category}&price=free&include_all_series_instances=on&incorporate_user_affinities=on&expand=venue,organizer&token=${config.EVENTBRITE_TOKEN}`;

    return {
        type: "FETCH_EVENTBRITE_EVENTS",
        payload: axios.get(eventbriteUrl)
    };
}