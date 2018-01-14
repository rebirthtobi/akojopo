import React, { PureComponent } from 'react';
import loader from './../img/loader.gif';


class Loading extends PureComponent {
    render() {
        return (
            <section className="section">
                <div className="container">				
                    <section className="section">
                        <div className="columns">
                            <div className="column is-5 is-offset-3">
                                <div className="card">
                                    <div className="card-content">
                                        <figure className="image is-4by3">
                                            <img src={loader} alt="Loading gif" />
                                        </figure>
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

export default Loading;