import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
//import './../js/nav.js';
import './../css/header.css';

class Nav extends PureComponent {

    logout = () => {
        this.props.logout();
    }

    handleMenuClick = () => {
        let targeticon = document.querySelector('#navbar-burger-button');
        let targetId = targeticon.dataset.target;
        targeticon.classList.toggle('is-active');
        let target = document.querySelector('#'+targetId).classList.toggle('is-active');
    }

    render() {
        let profile = '';
        let regLink = '';
        let regLinkMobile = '';
        if (this.props.auth) {
            profile = <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link is-hidden-touch">
                            <img src="avatar.png" className="image is-32x32 profile-pic is-outlined" alt="Profile avatar" />
                        </div>
                        <div className="navbar-dropdown is-right">
                            <a className="navbar-item" href="#">
                                Profile
                            </a>
                            <a className="navbar-item" href="#">
                                Link Account
                            </a>
                            <a className="navbar-item" onClick={this.logout}>
                                Logout
                            </a>
                        </div>
                    </div>;
        } else {
            regLink = <div id="registration-link" className="is-hidden-desktop">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                <NavLink exact to={'/register'} className="button">
                                    <span className="icon">
                                        <i className="fa fa-user-plus"></i>
                                    </span>
                                    <span>
                                        Register
                                    </span>
                                </NavLink>
                                </p>
                                <p className="control">
                                    <NavLink exact to={'/login'} className="button is-info is-outlined">
                                        <span className="icon">
                                            <i className="fa fa-user"></i>
                                        </span>
                                        <span>
                                            Login
                                        </span>
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </div>;
            regLinkMobile = <div className="navbar-item is-hidden-touch">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <NavLink exact to={'/register'} className="button">
                                            <span className="icon">
                                                <i className="fa fa-user-plus"></i>
                                            </span>
                                            <span>
                                                Register
                                            </span>
                                        </NavLink>
                                    </p>
                                    <p className="control">
                                        <NavLink exact to={'/login'} className="button is-info is-outlined">
                                            <span className="icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <span>
                                                Login
                                            </span>
                                        </NavLink>
                                    </p>
                                </div>
                            </div>;
        }

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink exact to={'/'} className="navbar-item">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="confent" width="112" height="28" />
                    </NavLink>

                    {regLink}
                    
                    <div id="navbar-burger-button" className="button navbar-burger" data-target="navMenu" onClick={this.handleMenuClick} >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div className="navbar-menu" id="navMenu">
                    <div className="navbar-end">
                        {regLinkMobile}
                        <NavLink exact to={'/'} className="navbar-item" activeClassName="is-active">
                            All
                        </NavLink>
                        <NavLink to={'/meetup'} exact className="navbar-item" activeClassName="is-active">
                            Meetup
                        </NavLink>
                        <NavLink to={'/eventbrite'} exact className="navbar-item" activeClassName="is-active">
                            Eventbrite
                        </NavLink>
                        {profile}
                    </div>
                </div>
            </nav>
        );
    };
}

Nav.propTypes = {
    auth: PropTypes.bool.isRequired
}

export default Nav;