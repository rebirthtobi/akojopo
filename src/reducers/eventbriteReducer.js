import defaultState from './../config/default';

export default function reducer (state = defaultState.event, action) { 
    switch (action.type){
        case "FETCH_EVENTBRITE_EVENTS_PENDING": {
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
        case "FETCH_EVENTBRITE_EVENTS_REJECTED": {
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
        case "FETCH_EVENTBRITE_EVENTS_FULFILLED": {
            let eventbriteResponse = action.payload;
            let events = [];
            let eventbrite_nextpage = false;

            if (eventbriteResponse.data.events.length > 0) {
                eventbriteResponse.data.events.forEach(item => { 
                    let d = new Date(item.start.utc);
                    events.push({
                        logo: item.logo?item.logo.url:'eventbrite',
                        name: item.name.text,
                        address: item.venue.localized_address_display,
                        time: d.toLocaleTimeString()+', '+d.toDateString(),
                        alt: item.organizer.name,
                        tag: 'eventbrite'
                    });
                });

                if (eventbriteResponse.data.pagination.page_count != "" && eventbriteResponse.data.pagination.page_count != null) {
                    eventbrite_nextpage = eventbriteResponse.data.pagination.page_count
                }
            };

            if (events.length > 0) {
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
                        eventbrite: eventbrite_nextpage ? eventbrite_nextpage : false,
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
                        meetup: false,
                        eventbrite: false,
                        current: 1
                    }
                };
            }            
        }
        default: {
            return state;
        }
    }
}