import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../css/events.css';
import SingleEvent from './SingleEvent';
import Pagination from './Pagination';

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
                <div>
                    <Pagination 
                        current={this.props.eventdata.currentPage} 
                        pages={this.props.eventdata.page_number}
                        nextPage={this.props.nextPage}
                        prevPage={this.props.prevPage}
                    />
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
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
}

export default Event;