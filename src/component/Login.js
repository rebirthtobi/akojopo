import React, { Component } from 'react';
import dompurify from 'dompurify';
import validator from 'validator';
import { connect } from 'react-redux';
import { withRouter, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from './../actions/authActions';
import './../css/login.css';

class Login extends Component {
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

    validate = (username, password) => {
        return {
            'username': validator.isEmail(username),
            'password': !validator.isEmpty(password)
        }
    }

    login = (e) => {
        e.preventDefault();
        this.setState({
            errorMesage: null
        });

        let deleteButton = document.querySelector('.delete');
        if (deleteButton) {
			deleteButton.parentElement.style.display = 'block';
		}

        let username = dompurify.sanitize(this.refs.username.value.trim());
        let password = dompurify.sanitize(this.refs.password.value.trim());
        let validation = this.validate(username, password);

        if (validation.username && validation.password) {
            this.refs.username.value = '';
            this.refs.password.value = '';
            
            this.props.login(username, password);
        } else {
            let usernameMsg = <li> Username is required and must be a valid email address </li>;
            let passwordMsg = <li> Password is required </li>;
            let errorMesage = <div className="notification is-danger">
                                    <button className="delete" onClick={ this.closeNotification }></button>
                                    There are errors in your details
                                    <ul>
                                        { validation.username ? '' : usernameMsg }
                                        { validation.password ? '' : passwordMsg }
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
            let message = null;
            let errorMessageData = null;
            if (typeof(this.props.message) == "object") {
                errorMessageData = this.props.message.map((value) => {
                    return <li>
                            {value}
                        </li>
                })
                message = <ul>
                    {errorMessageData}
                </ul>
            } else {
                message = this.props.message;
            }
            alert = <div className="notification is-danger">
                        <button className="delete" onClick={ this.closeNotification }></button>
                        {message}
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
                    <section className="section">
                        <div className="columns">
                            <div className="column is-5 is-offset-3 has-text-centered">
                                <h4 className="title is-4">
                                    Login to Akojopo
                                </h4>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-5 is-offset-3">
                                <div className="card">
                                <div className="card-content">
                                    <div className="content">
                                        {alert}
                                        <form onSubmit={ this.login }>						
                                            <div className="field">
                                                <label className="label">Email</label>
                                                <div className="control has-icons-left">
                                                    <input className="input" ref="username" type="email" placeholder="Email" />
                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-envelope"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control has-icons-left">
                                                    <input className="input" ref="password" type="password" placeholder="******" />
                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-key"></i>
                                                    </span>
                                                </div>
                                            </div>
                                                                        
                                            <div className="field">
                                                <div className="control">
                                                    <button type="submit" className="button login-btn is-link">Login</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                </div>							
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-5 is-offset-3">
                                <div className="card">
                                <div className="card-content">
                                    <div className="content has-text-centered">
                                        Don't have an account? <Link to="/register" className="is-link">Sign Up </Link> <br />
                                        Forget password? <Link to="/reset" className="is-link">Reset Password</Link>
                                    </div>
                                </div>
                                </div>							
                            </div>
                            <div className="column is-5 is-offset-3">
                                <div className="card">
                                <div className="card-content">
                                    <div className="content has-text-centered">
                                        <Link to="/" className="is-link">Home</Link>
                                    </div>
                                </div>
                                </div>							
                            </div>
                        </div>
                    </section>		
                    
                    <section className="section">
                        <div className="container">
                            <div className="columns">
                                <div className="column is-5 is-offset-3">
                                    <div className="content has-text-centered">
                                        <p>
                                            with  <span className="is-danger" role="img" aria-label="beating heart emoji"> &#128147;</span> by rebirthtobi <span role="img" aria-label="pc emoji"> &#128187; </span>
                                        </p>
                                    </div>					
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
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
        login: (email, password) => dispatch(login(email, password))
    }
);
  
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login));