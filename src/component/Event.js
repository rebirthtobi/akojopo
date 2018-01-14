import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../css/events.css';
import SingleEvent from './SingleEvent';

class Event extends Component {
    render() {
        return (
            <div className="column is-three-quarters-tablet">
                <div className="columns is-multiline is-desktop">
                    <div className="column is-12">
                        { this.props.eventdata.data[this.props.eventdata.currentPage-1].map((item, index) => {
                            return <SingleEvent item={item} key={index} index={index}/>;
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

Event.propTypes = {
    eventdata: PropTypes.shape({
		currentPage: PropTypes.number.isRequired,
        page_number: PropTypes.number.isRequired,
        data: PropTypes.array.isRequired
	}),
}

export default Event;