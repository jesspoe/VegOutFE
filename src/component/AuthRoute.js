import React from 'react';
import { Route, Redirect } from 'react-router';

const AuthRoute = ({ component: Component, ...state }) => (
  <Route {...state} render={props => (
    localStorage.getItem('jwt') ?
      (
        <Component {...props} />
      )
      :
      (
        <Redirect to={{
          pathname: '/signup',
          state: { from: props.location }
        }} />
      )
  )} />
)

export default AuthRoute;

/**
  This route allows us to keep out non-logged in users
 */