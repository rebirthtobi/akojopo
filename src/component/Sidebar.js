import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import categories from './../config/category';

class Sidebar extends Component {
    componentDidMount() {
        this.manageDomNode();
    }

    manageDomNode = () => {
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            node.querySelector('.filter-body').className = "is-hidden";
        }
    }

    toggleCategory = () => {
        document.querySelector('#filter-body').classList.toggle('is-hidden');
        let targeticon = document.querySelector('#category-icon');
        
        if (targeticon.className == "ion-ios-arrow-up") {
            targeticon.className = "ion-ios-arrow-down";
        } else {
            targeticon.className = "ion-ios-arrow-up";
        };
    }

    render() {
        let categoriesArray = Object.keys(categories);

        return (
                <div className="column is-one-quarter-tablet">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Logo" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="field">
                                <div className="control has-icons-left">
                                    <input type="text" className="input" placeholder="Location" />
                                    <span className="icon is-left">
                                        <i className="fa fa-map-marker"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="filer-box has-text-info">
                                <div className="filter">
                                    <div className="filter-head" onClick = {this.toggleCategory }>
                                        <h2 className="is-uppercase" id="category-header" data-target="category-filter">
                                            category
                                            <span className="icon is-pulled-right is-size-3 filter-icon">
                                                <i className="ion-ios-arrow-down" id="category-icon"></i>
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="filter-body" id="filter-body">
                                        <h5 className="is-capitalized selected categoryElement" onClick={() => {this.props.searchByCategory()}}>All</h5>
                                        {categoriesArray.map((item, index) => {
                                            return <h5 className="is-capitalized categoryElement" key={index} onClick={() => {this.props.searchByCategory(item)}}>{item}</h5>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

Sidebar.PropTypes = {
    searchByCategory: PropTypes.func.isRequired
}

export default Sidebar;