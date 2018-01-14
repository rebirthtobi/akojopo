import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import All from './All';
import Nav from './Nav';
import Footer from './Footer';
import Meetup from './Meetup';
import Eventbrite from './Eventbrite';
import { checkAuthentication } from './../actions/initActions';
import { logout } from './../actions/authActions';

class Container extends Component {
    componentDidMount(){
        if (!this.props.check && !this.props.auth) {
            this.props.checkAuthentication();
        }
    }

	render() {
		return (
            <div>
                <Nav auth={this.props.auth} logout={this.props.logout}/>
                    <Route exact path='/' component={All} />
                    <Route exact path='/meetup' component={Meetup} />
                    <Route exact path='/eventbrite' component={Eventbrite} />
                <Footer />
            </div>
		);
	}
}

Container.propTypes = {
    checkAuthentication: PropTypes.func.isRequired,
    check: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return state.authentication;
};

const mapDispatchToProps = dispatch => (
    {
        checkAuthentication: () => dispatch(checkAuthentication()),
        logout: () => dispatch(logout())
    }
);
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Container));