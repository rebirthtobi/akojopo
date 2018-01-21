import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../css/pagination.css';

class Pagination extends Component {
    handleNextPage = () => {
        this.props.nextPage();
    }

    handlePrevPage = () => {
        this.props.prevPage();
    }

    render() {
        let current = this.props.current;
        let prevDisabled = 'disabled';
        let nextDisabled = '';

        if (this.props.pages < 1 || current == this.props.pages) {
            nextDisabled = 'disabled';
            prevDisabled = '';
        }
        if (current > 1) {
            prevDisabled = '';
        }
        if (current == 1) {
            prevDisabled = 'disabled';
        }

        let nextAttrDisabled = {disabled: nextDisabled};
        let prevAttrDisabled = {disabled: prevDisabled};
        
        return (
            <div>
            <nav className="pagination is-centered" aria-label="pagination">
                <a className="pagination-previous" {...prevAttrDisabled} onClick = {this.handlePrevPage}>Previous</a>
                <a className="pagination-next" {...nextAttrDisabled} onClick = {this.handleNextPage}>Next page</a>

                <ul className="pagination-list" style={{listStyle: 'none'}}>
                    <li><a className="pagination-link is-current" >{this.props.current}</a></li>
                </ul>
            </nav>
            </div>
        )
    }
}

Pagination.propTypes = {
    current: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
};
  
export default Pagination;