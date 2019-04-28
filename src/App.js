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
      filterChoice: "",
      currentLat: 47.608051499999995,
      currentLong: -122.3334927,
      currentCity: ""
    }
  }

  componentDidMount() {
    this.getLocation()
    this.getCity()
    this.grabGroups()

    // fetch(`http://localhost:3000/restaurants`)
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log("restaurant json", json)
    //     this.setState({
    //       restaurants: json
    //     })
    //   }).then(this.grabGroups()).then(this.getLocation()).then(this.getCity())
  }


  setInitial = () => {
    console.log("do we have current city", this.state.currentCity)
    fetch(`http://localhost:3000/initial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      body: JSON.stringify({
        currentCity: this.state.currentCity
      })
    }).then(response => response.json())
      .then(json => {
        console.log("filtered json", json)
        this.setState({
          restaurants: json
        })
      })
  }


  getLocation = () => {
    let url = "https://www.googleapis.com/geolocation/v1/geolocate?key="
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
      .then(result => result.json())
      .then(data => {
        this.setState({
          currentLat: data.location.lat,
          currentLong: data.location.lng
        })
      })
  }

  getCity = () => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLat},${this.state.currentLong}&key=`
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
      .then(result => result.json())
      .then(data => {
        // console.log("what's city", data.results[0].address_components[3].long_name)
        this.setState({
          currentCity: data.results[0].address_components[3].long_name
        }, () => this.setInitial())
      })
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
            <AuthRoute exact path='/' component={() => <Home restaurants={this.state.restaurants} searchResults={this.searchResults} currentLat={this.state.currentLat} currentLong={this.state.currentLong} />} />
            <AuthRoute exact path='/groups' component={() => <GroupContainer groups={this.state.groups} grabGroups={this.grabGroups} />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;