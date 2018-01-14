const defaultState = {
    event: {
        country: {
            code: "ng",
            name: "Nigeria"
        },
        city: "lagos",
        category: {
            meetup: 34,
            eventbrite: 102
        },
        error: {
            loading: false,
            noData: false,
            badRequest: false
        },
        eventdata: {
            currentPage: 0,
            page_number: 0,
            data: []
        },
        page: {
            meetup: false,
            eventbrite: false,
            current: 0
        }
    },
    auth: {
        loading: false,
        error: false,
        auth: false,
        message: null,
        check: false
    }
};

export default defaultState;