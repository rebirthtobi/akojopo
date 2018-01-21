import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchEventbriteEvent, fetchEventbriteByCategory } from './../actions/eventbriteActions';
import { nextPage, prevPage } from './../actions/paginationActions';
import Event from './Event';
import Sidebar from './Sidebar';
import Loading from './Loading';
import Error from './Error';

class Eventbrite extends PureComponent {
    constructor (props) {
        super(props);
        this.loading = 'Loading......';    
        this.errorMsg = `There was error getting data from loaction`;
        this.noDataMsg = 'No Data Returned';
    }

    componentDidMount () {
        this.props.fetchEventbriteEvent(this.props.country.name, this.props.category.eventbrite);
    }

    searchByCategory = (category = null) => {
        if (category) {
            this.props.fetchEventbriteByCategory(this.props.country.name, category);
        } else {
            this.props.fetchEventbriteEvent(this.props.country.name, this.props.category.eventbrite);
        }
    }
    
    handleNextPage = () => {
        this.props.nextPage();
    }

    handlePrevPage = () => {
        this.props.prevPage();
    }

    render() {
        if (this.props.error.loading) {
            return (
                <Loading />
            );             
        } else if (this.props.error.noData) {
            let message = "There is no data fetched";
            return (
                <Error message={message} />
            );
        } else if (this.props.error.badRequest) {
            let message = "There is an error with the server";
            return (
                <Error message={message} />
            );
        } else if (this.props.eventdata.data.length > 0) {
            return (
                <section className="section">
                    <div className="columns">
                        <Sidebar searchByCategory = {this.searchByCategory}/>
                        <Event eventdata = {this.props.eventdata} nextPage={this.handleNextPage} prevPage={this.handlePrevPage}/>
                    </div>
                </section>
            );
        } else {
            let message = "There is an error with the server";
            return (
                <Error message={message} />
            );
        }
    }
}

Eventbrite.propTypes = {
    country: PropTypes.shape({
		code: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}),
    city: PropTypes.string.isRequired,
    category: PropTypes.shape({
		meetup: PropTypes.number.isRequired,
		eventbrite: PropTypes.number.isRequired
    }),
    error:  PropTypes.shape({
		badRequest: PropTypes.bool.isRequired,
		loading: PropTypes.bool.isRequired,
		noData: PropTypes.bool.isRequired
    }),
    eventdata: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,    
    fetchEventbriteEvent: PropTypes.func.isRequired,
    fetchEventbriteByCategory: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return state.eventbrite;
};
  
const mapDispatchToProps = dispatch => (
    {
        fetchEventbriteEvent: (city, country_code, country_name, meetup_category, eventbrite_category) => dispatch(fetchEventbriteEvent(city, country_code, country_name, meetup_category, eventbrite_category)),
        fetchEventbriteByCategory: (city, country_code, country_name, category) => dispatch(fetchEventbriteByCategory(city, country_code, country_name, category)),
        nextPage: (page) => dispatch(nextPage(page)),
        prevPage: (page) => dispatch(prevPage(page))
    }
);
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Eventbrite));