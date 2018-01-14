import React from 'react';
import meetupLogo from './../img/meetup.png';
import eventbriteLogo from './../img/eventbrite.png';
import PropTypes from 'prop-types';

const SingleEvent = ({item, index}) => {
    let tag = item.tag;
    let tagColor = (tag == 'meetup') ? '#ED1C40' : '#F6682F';
    const tagStyle = {
        color: '#fff',
        backgroundColor: tagColor
    };
    let logo = null;

    if (item.logo == 'meetup') {
        logo = meetupLogo;
    } else if (item.logo == 'eventbrite') {
        logo = eventbriteLogo;
    } else {
        logo = item.logo;
    }

    return (
            <div className="content event-item">
                <section className="media">
                    <figure className="media-left is-marginless">
                        <p className="image is-128x128">
                            <img src={logo} alt={item.alt} />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="event-body">
                            <span className="help is-uppercase"> {item.time} </span>
                            <p className="is-capitalized is-size-5">
                                {item.name}
                            </p>
                            <span className="help is-uppercase"> {item.address} </span>
                        </div>
                        <div className="event-footer">
                            <span className="tag is-pulled-left" style={tagStyle}>{tag}</span>
                            
                            <span className="has-text-success is-pulled-right event-response"><i className="fa fa-heart-o is-size-4"></i></span>
                            <span className="is-clearfix"></span>
                        </div>
                    </div>
                </section>
            </div>
        );
}

SingleEvent.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default SingleEvent;