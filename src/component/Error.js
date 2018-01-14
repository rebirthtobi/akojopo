import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import teddy from './../img/teddy.jpg';

class Error extends PureComponent {

    render() {
        return (
            <section className="section">
                <div className="container">				
                    <section className="section">
                        <div className="columns">
                            <div className="column is-5 is-offset-3">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="content">
                                            <figure className="image is-4by3">
                                                <img src={teddy} alt="Teddy saying what is the meaning of this error" />
                                            </figure>
                                        </div>								
                                        <div className="content has-text-centered">
                                            <div className="notification is-danger">
                                                { this.props.message }
                                            </div>
                                        </div>
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

Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error;