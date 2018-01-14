import React, { Component } from 'react';
import dompurify from 'dompurify';
import validator from 'validator';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from './../actions/authActions';
import './../css/register.css';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorMesage: null
        };
    }

    componentWillMount(){
        if (this.props.auth) {
            this.props.history.replace('/');
        }
    }    

    componentDidUpdate(){
        if (this.props.auth) {
            this.props.history.replace('/');
        }
    }

    validate = (name, password, confirmpassword, email, city, country) => {
        return {
            'name': !validator.isEmpty(name),
            'email': validator.isEmail(email),
            'password': !validator.isEmpty(password),
            'confirmpassword': (!validator.isEmpty(confirmpassword) && validator.equals(confirmpassword, password)),
            'city': !validator.isEmpty(city),            
            'country': !validator.isEmpty(country),
        }
    }

    register = (e) => {
        e.preventDefault();
        this.setState({
            errorMesage: null
        });

        let deleteButton = document.querySelector('.delete');
        if (deleteButton) {
			deleteButton.parentElement.style.display = 'block';
		}
		
        let name = dompurify.sanitize(this.refs.name.value);
        let password = dompurify.sanitize(this.refs.password.value);
        let confirmpassword = dompurify.sanitize(this.refs.confirmpassword.value);
        let email = dompurify.sanitize(this.refs.email.value);
        let city = dompurify.sanitize(this.refs.city.value);
        let country = dompurify.sanitize(this.refs.country.value);

        let validation = this.validate(name, password, confirmpassword, email, city, country);

        if (validation.name && validation.email && validation.password && validation.confirmpassword && validation.city && validation.country) {
            this.refs.password.value = '';
            this.refs.confirmpassword.value = '';

            this.props.register(name, email, password, country, city);
        } else {
            let nameMsg = <li> Name is required </li>;
            let emailMsg = <li> Email is required and must be a valid email address </li>;
            let passwordMsg = <li> Password is required </li>;
            let confirmpasswordMsg = <li> Confirmation Password is required and must be equal to Password field</li>;
            let cityMsg = <li> City is required </li>;
            let countryMsg = <li> Country is required </li>;
            let errorMesage = <div className="notification is-danger">
                                    <button className="delete" onClick={ this.closeNotification }></button>
                                    There are errors in your details
                                    <ul>
                                        { validation.name ? '' : nameMsg }
                                        { validation.email ? '' : emailMsg }
                                        { validation.password ? '' : passwordMsg }
                                        { validation.confirmpassword ? '' : confirmpasswordMsg }
                                        { validation.city ? '' : cityMsg }
                                        { validation.country ? '' : countryMsg }
                                    </ul>
                                </div>;
            this.setState({
                errorMesage: errorMesage
            });                    
        }  
    }

    closeNotification = () => {
		let deleteButton = document.querySelector('.delete');
        if (deleteButton) {
			deleteButton.parentElement.style.display = 'none';
		}
    }    

    render() {
        let alert = "";

        if(this.state.errorMesage){
            alert = this.state.errorMesage;
        } else if (this.props.loading) {
            alert = <div className="notification is-info">
                        <button className="delete" onClick={ this.closeNotification }></button>
                        Loading...
                    </div>
        } else if (this.props.error) {
            alert = <div className="notification is-danger">
                        <button className="delete" onClick={ this.closeNotification }></button>
						{this.props.message ? this.props.message: "Error: There is a problem on the client system"}
                    </div>
        } else if (this.props.auth) {
            alert = <div className="notification is-success">
                        <button className="delete" onClick={ this.closeNotification }></button>
                        {this.props.message}
                    </div>
        }
        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-1 is-hidden-mobile">
                        </div>
                        <div className="column is-6">
                            {alert}
                            <form onSubmit={this.register} >
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input className="input" ref="name" type="text" placeholder="Full Name" />
                                    </div>
                                    <p className="help">Full Name of the user</p>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input className="input" ref="email" type="email" placeholder="Email" />
                                        <span className="icon is-small is-left">
                                        <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                    <p className="help">Email for logging in</p>
                                </div>
                                
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input className="input" ref="password" type="password" placeholder="******" />
                                        <span className="icon is-small is-left">
                                        <i className="fa fa-key"></i>
                                        </span>
                                    </div>
                                    <p className="help">Password to gain access</p>
                                </div>
                                
                                <div className="field">
                                    <label className="label">Confirm Password</label>
                                    <div className="control has-icons-left">
                                        <input className="input" ref="confirmpassword" type="password" placeholder="******"/>
                                        <span className="icon is-small is-left">
                                        <i className="fa fa-key"></i>
                                        </span>
                                    </div>
                                    <p className="help">Confirm Password entered above</p>
                                </div>
                                
                                <div className="field">
                                    <label className="label">Country</label>
                                    <div className="control">
                                        <input className="input" ref="country" type="text" placeholder="Country" />
                                    </div>
                                    <p className="help">Country will be used as the deafult search option</p>
                                </div>
                                
                                <div className="field">
                                    <label className="label">City</label>
                                    <div className="control">
                                        <input className="input" ref="city" type="text" placeholder="City" />
                                    </div>
                                    <p className="help">City will be used as the deafult search option</p>
                                </div>
                                
                                <div className="field is-grouped is-grouped-centered">
                                    <div className="control">
                                        <button type="submit" className="button is-link">Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="column is-4 is-hidden-mobile">
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title">
                                    Benefits
                                    </p>
                                </div>
                                <div className="card-content">
                                    <div className="content has-text-weight-semibold">
                                        <div>
                                            <span className="icon has-text-info">
                                            <i className="fa fa-check"></i>
                                            </span>
                                            <span className="is-capitalize">
                                                Two way search system
                                            </span>
                                        </div>
                                        <div>
                                            <span className="icon has-text-info">
                                            <i className="fa fa-check"></i>
                                            </span>
                                            <span className="is-capitalize">
                                                Immediate researvation
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-one-quarter">
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
    message: PropTypes.string,
};

const mapStateToProps = state => {
    return state.authentication;
};

const mapDispatchToProps = dispatch => (
    {
        register: (name, email, password, country, city) => dispatch(register(name, email, password, country, city))
    }
);
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Register));