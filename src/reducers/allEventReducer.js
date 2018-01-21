import defaultState from './../config/default';
import sortJsonArray from 'sort-json-array';

export default function all (state = defaultState.event, action) {
    switch (action.type){
        case "FETCH_EVENTS_PENDING": {
            return {
                ...state,
                error: {
                    badRequest: false,
                    loading: true,
                    noData: false
                },
                eventdata: {
                    data: [],
                    currentPage: 0,
                    page_number: 0
                },
                page: {
                    meetup: false,
                    eventbrite: false,
                    current: 1
                }
            };
        }
        case "FETCH_EVENTS_REJECTED": {
            return {
                ...state,
                error: {
                    badRequest: true,
                    loading: false,
                    noData: false
                },
                eventdata: {
                    data: [],
                    currentPage: 0,
                    page_number: 0
                },
                page: {
                    meetup: false,
                    eventbrite: false,
                    current: 1
                }
            };
        }
        case "FETCH_EVENTS_FULFILLED": {
            let meetupResponse = action.payload[0];
            let eventbriteResponse = action.payload[1];
            let events = [];
            let meetup_nextpage = false;
            let eventbrite_nextpage = false;

            if (meetupResponse.data.results.length > 0) {
                meetupResponse.data.results.forEach(item => {
                    let time = item.time ? new Date(item.time) : null;
                    events.push({
                        logo: 'meetup',
                        name: item.name ? item.name : 'Not specified',
                        address: item.venue ? item.venue.name+', '+item.venue.city+', '+item.venue.localized_country_name : '',
                        time: time ? time.toLocaleTimeString()+', '+time.toLocaleDateString() : 'Not specified',
                        alt: 'meetup',
                        tag: 'meetup',
                        tString: item.time,
                    });
                });

                if (meetupResponse.data.meta.next != "" && meetupResponse.data.meta.next != null) {
                    meetup_nextpage = meetupResponse.data.meta.next
                }
            };

            if (eventbriteResponse.data.events.length > 0) {
                eventbriteResponse.data.events.forEach(item => {                    
                    let d = new Date(item.start.utc);
                    events.push({
                        logo: item.logo?item.logo.url:'eventbrite',
                        name: item.name.text,
                        address: item.venue.localized_address_display,
                        time: d.toLocaleTimeString()+', '+d.toDateString(),
                        alt: item.organizer.name,
                        tag: 'eventbrite',                        
                        tString: d.getTime()
                    });
                });

                if (eventbriteResponse.data.pagination.page_count != "" && eventbriteResponse.data.pagination.page_count != null) {
                    eventbrite_nextpage = eventbriteResponse.data.pagination.page_count
                }
            };

            if (events.length > 0) {
                sortJsonArray(events, 'tString');
                let pages = Math.ceil(events.length/25);
                let pagedata = [];

                for (let i = 0; i < pages; i++) {
                    let data = [];

                    if (i == (pages - 1)) {
                        data = events.slice(i * 25);
                    } else {
                        data = events.slice(i * 25, i + 25);
                    }

                    pagedata.push(data);
                }
                return {
                    ...state,
                    error: {
                        badRequest: false,
                        loading: false,
                        noData: false
                    },
                    eventdata: {
                        data: pagedata,
                        currentPage: 1,
                        page_number: pages
                    },
                    page: {
                        meetup: false,
                        eventbrite: false,
                        current: 1
                    }
                };
            } else {
                return {
                    ...state,
                    error: {
                        badRequest: false,
                        loading: false,
                        noData: true
                    },
                    eventdata: {
                        data: [],
                        currentPage: 0,
                        page_number: 0
                    },
                    page: {
                        meetup: meetup_nextpage ? meetup_nextpage : false,
                        eventbrite: eventbrite_nextpage ? eventbrite_nextpage : false,
                        current: 1
                    }
                };
            }            
        }
        case "NEXT_PAGE": {
            let current = state.eventdata.currentPage + 1;

            if (current > state.eventdata.page_number) {
                current = state.eventdata.page_number;
            }

            return {
                ...state,
                eventdata: {
                    data: state.eventdata.data,
                    currentPage: current,
                    page_number: state.eventdata.page_number
                },
                page: {
                    meetup: false,
                    eventbrite: false,
                    current: current
                }
            };
        }
        case "PREV_PAGE": {
            let current = state.eventdata.currentPage - 1;

            if (current <= 1) {
                current = 1;
            }

            return {
                ...state,
                eventdata: {
                    data: state.eventdata.data,
                    currentPage: current,
                    page_number: state.eventdata.page_number
                },
                page: {
                    meetup: false,
                    eventbrite: false,
                    current: current
                }
            };
        }
        default: {
            return state;
        }
    }
}