import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import UnAuthRoute from './component/UnAuthRoute';
import AuthRoute from './component/AuthRoute';
import Signup from './component/Signup.js'
import Login from './component/Login.js'
import Home from './container/Home.js'
import GroupContainer from './container/GroupContainer.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      restaurants: [],
      groups: [],
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
      }).then(this.grabGroups())
  }



  grabGroups = () => {
    fetch('http://localhost:3000/groups', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({
        groups: json
      })
    })
  }

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
            <UnAuthRoute exact path='/signup' component={Signup} />
            <UnAuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/' component={() => <Home restaurants={this.state.restaurants} searchResults={this.searchResults} />} />
            <AuthRoute exact path='/groups' component={() => <GroupContainer groups={this.state.groups} grabGroups={this.grabGroups} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;