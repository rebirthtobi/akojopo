import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Dev extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            noData: false,
            firstPage: 1,
            lastPage: 34,
            currentPage: 1
        };
        this.loading = <div> Loading...... </div>;    
        this.errorMsg = <div> There was error getting data from loaction: {this.props.location} </div>;
        this.noDataMsg = <div> No Data Returned </div>;
    }

    componentDidMount () {
        let url = `https://api.github.com/search/users?q=location:${this.props.location}`;
        axios.get(url).then((response) => {
            if (response.status !== 200) {
                throw Error(response);
            } else if (response.data.total_count > 0) {
                this.setState ({
                    loading: false,
                    dev: response.data.items 
                })
            } else {
                this.setState ({
                    loading: false,
                    noData: true
                })
            }
        }).catch((err) => {
            this.setState ({
                loading: false,
                error: true
            })
        });
    }

    loadMore = () => {
        let page = this.state.currentPage;
        let load = false;
        if (this.state.currentPage < this.state.lastPage) {
            load = true;
            page++;
        }

        if (load) {
            let url = `https://api.github.com/search/users?q=location:${this.props.location}&page=${page}`;
            axios.get(url).then((response) => {
                if (response.status !== 200) {
                    throw Error(response);
                } else if (response.data.total_count > 0) {
                    let data = this.state.dev.concat(response.data.items);
                    this.setState({
                        loading: false,
                        dev: data,
                        currentPage: page
                    })
                } else {
                    this.setState({
                        loading: false,
                        noData: true
                    })
                }
            }).catch((err) => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
        }
    }

    loadLess = () => {
        let page = this.state.currentPage;

        if (this.state.currentPage > this.state.firstPage) {
            page--;
            let data = this.state.dev;
            data.splice(data.length-30, 30);
            this.setState({
                dev: data,
                currentPage: page
            });
        }
    }

    pagination = () => {
        if (this.state.firstPage == this.state.currentPage) {
            return <nav aria-label="...">
                <ul class="pager">
                    <li class="previous disabled"><a href="#"><span aria-hidden="true">&larr;</span> Less</a></li>
                    <li class="next" onClick={() => this.loadMore()} ><a href="#">More <span aria-hidden="true">&rarr;</span></a></li>
                </ul>
            </nav>;
        } else if (this.state.lastPage == this.state.currentPage) {
            return <nav aria-label="...">
                <ul class="pager">
                    <li class="previous"><a onClick={() => this.loadLess()} ><span aria-hidden="true">&larr;</span> Less</a></li>
                    <li class="next disabled"><a href="#">More <span aria-hidden="true">&rarr;</span></a></li>
                </ul>
            </nav>;
        } else {
            return <nav aria-label="...">
                <ul class="pager">
                    <li class="previous"><a onClick={() => this.loadLess()}><span aria-hidden="true">&larr;</span> Less</a></li>
                    <li class="next"><a onClick={() => this.loadMore()}>More <span aria-hidden="true">&rarr;</span></a></li>
                </ul>
            </nav>;
        }
    }

    render() {
        if (this.state.loading) {
            return this.loading;
        } else if (this.state.noDataMsg) {
            return this.noDataMsg;
        } else if (this.state.dev) {
            return <div className="row">
                <div className="col-sm-12">
                    <div className="">
                    { this.state.dev.map((item, index) => {
                            return <div key={index} className="col-sm-4">
                                <img className="img-responsive" src={item.avatar_url} alt={item.login}/>
                                <div>{item.login}</div>
                            </div>;
                        }) }
                    </div>
                </div>
                <div className="col-sm-12">
                    { this.pagination() }
                </div>
            </div>;
        } else {
            return this.errorMsg;
        }
    }
}

Dev.defaultProps = {
    location: 'nigeria'
}

Dev.propTypes = {
    location: PropTypes.string
}

export default Dev;
