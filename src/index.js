import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import './index.css';
import App from './modules/App/App';
import Login from './components/Login/Login';
import reducers from '../src/redux/reducer';

const testStore = createStore(reducers);

ReactDOM.render(
  <Provider store={testStore}>
    <Router>
      <Redirect exact to='/Home' component={App} />
      <Switch>
        <Route exact path="/Home" component={App} />
        <Route exact path="/Login" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
