import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './component/Login';
import Register from './component/Register';
import Container from './component/Container';

class App extends Component {
	render() {
		const supportsHistory = 'pushState' in window.history;
		
		return (
				<Provider store={store} >
					<BrowserRouter forceRefresh={!supportsHistory}>
						<div>
							<Switch>
								<Route exact path='/login' component={Login} />
								<Route exact path='/register' component={Register} />
								<Route path='/' component={Container} />
							</Switch>
						</div>
					</BrowserRouter>				
				</Provider>
		);
	}
}

export default App;

//TODO: style the selected ctegory
//TODO: pagination design and implementation
//TODO: fix the map not showing up
//TODO: fix search by location