import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import UnAuthRoute from './component/UnAuthRoute';
import AuthRoute from './component/AuthRoute';
import Signup from './component/Signup.js'
import Login from './component/Login.js'
import Home from './container/Home.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      restaurants: [],
      citySearch: "",
      filterChoice: ""
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/restaurants`)
      .then(response => response.json())
      .then(json => {
        console.log("restaurant json", json)
        this.setState({
          restaurants: json
        })
      })
  }

  //make a post request that passes in params to the body and then populate the url with the params that you passed. 

  searchResults = (data) => {
    this.setState({
      citySearch: data.search
    }, () => fetch(`http://localhost:3000/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        citySearch: this.state.citySearch
      })
    }).then(response => response.json())
      .then(json => {
        console.log("filtered json", json)
        this.setState({
          restaurants: json
        })
      }))

  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <UnAuthRoute exact path='/' component={Signup} />
            <UnAuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/home' component={() => <Home restaurants={this.state.restaurants} searchResults={this.searchResults} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;