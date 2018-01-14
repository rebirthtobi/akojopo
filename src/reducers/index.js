import { combineReducers } from 'redux';
import all from './allEventReducer';
import meetup from './meetupReducer';
import eventbrite from './eventbriteReducer';
import authentication from './authenticationReducer';

export default combineReducers({
    all,  
    meetup,
    eventbrite,
    authentication,
});