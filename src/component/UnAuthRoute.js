import React from 'react';
import { Route, Redirect } from 'react-router';

const UnAuthRoute = ({ component: Component, ...state }) => (
  <Route {...state} render={props => (
    localStorage.getItem('jwt') ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    ) : (
        <Component {...props} />
      )
  )} />
)

export default UnAuthRoute;

/**
 * This route allows us to keep a logged-in user from
 * accessing the forms at '/login' and '/signup'
 */