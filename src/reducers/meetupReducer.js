import defaultState from './../config/default';

export default function all (state = defaultState.event, action) {
    switch (action.type){
        case "FETCH_MEETUP_EVENTS_PENDING": {
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
        case "FETCH_MEETUP_EVENTS_REJECTED": {
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
        case "FETCH_MEETUP_EVENTS_FULFILLED": {
            let meetupResponse = action.payload;
            let events = [];
            let meetup_nextpage = false;

            if (meetupResponse.data.results.length > 0) {
                meetupResponse.data.results.forEach(item => {
                    let time = item.time ? new Date(item.time) : null;
                    events.push({
                        logo: 'meetup',
                        name: item.name ? item.name : 'Not specified',
                        address: item.venue ? item.venue.name+', '+item.venue.city+', '+item.venue.localized_country_name : '',
                        time: time ? time.toLocaleTimeString()+', '+time.toLocaleDateString() : 'Not specified',
                        alt: 'meetup',
                        tag: 'meetup'
                    });
                });

                if (meetupResponse.data.meta.next != "" && meetupResponse.data.meta.next != null) {
                    meetup_nextpage = meetupResponse.data.meta.next
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
                        meetup: meetup_nextpage ? meetup_nextpage : false,
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
                        meetup: false,
                        eventbrite: false,
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