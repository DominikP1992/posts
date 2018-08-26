import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// components
import LoginPage from './containers/LoginPage';
import Wall from './containers/Wall';
import Card from './containers/Card';


// utils
import { checkAuthentication } from './authentication/index';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (checkAuthentication() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))
    }
  />
);


const Routes = () => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/wall" />}
      />
      <PrivateRoute exact path="/wall" component={Wall} />
      <PrivateRoute path="/wall/:id" component={Card} />
      <Route path="/login" component={LoginPage} />
      <Route path="*" component={() => <div>page not found</div>} />
    </Switch>
  </Router>
);

export default Routes;
