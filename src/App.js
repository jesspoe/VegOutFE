import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import 'toasted-notes/src/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UnAuthRoute from './component/UnAuthRoute';
import AuthRoute from './component/AuthRoute';
import Signup from './component/Signup.js'
import Login from './component/Login.js'
import Logout from './container/Logout.js'
import Home from './container/Home.js'
import GroupContainer from './container/GroupContainer.js'
import GroupCard from './component/GroupCard.js'
import Resources from './container/Resources.js'
import toaster from 'toasted-notes';




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
      currentCity: "",
      user_id: localStorage.getItem('user'),
      errorMsg: "No Restaurants Available, Please Search a Different Postal Code.",
      currentCard: {},
      singleGroupId: null
    }
  }

  componentDidMount() {
    // this.getLocation()
    // this.getCity()
    // this.grabGroups()

    fetch(`https://git.heroku.com/veggout-be.git/api`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          restaurants: json
        })
      }).then(this.grabGroups()).then(this.getLocation()).then(this.getCity())
      .catch((error) => {
        console.log(error)
      });
  }

  sendProps = (group) => {
    this.setState({
      singleGroupId: group.id
    })
  }

  getSingleGroup = () => {
    let singleGroup;
    this.state.groups.forEach((agroup) => {
      if (agroup.id === this.state.singleGroupId) {
        singleGroup = agroup
      }
    })
    return singleGroup
  }


  setUserId = (id) => {
    this.setState({ user_id: id }, () => localStorage.setItem('user', id))
  }



  setInitial = () => {
    console.log("do we have current city", this.state.currentCity)
    fetch(`https://git.heroku.com/veggout-be.git/initial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      body: JSON.stringify({
        currentCity: this.state.currentCity
      })
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(response => response.json())
      .then(json => {
        console.log("filtered json", json)
        this.setState({
          restaurants: json
        })
      }).catch((error) => {
        console.log(error)
      });
  }


  getLocation = () => {
    let url = "https://www.googleapis.com/geolocation/v1/geolocate?key="
    fetch(url, {
      method: 'POST'
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(result => result.json())
      .then(data => {
        this.setState({
          currentLat: data.location.lat,
          currentLong: data.location.lng
        })
      }).catch((error) => {
        console.log(error)
      });
  }


  getCity = () => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLat},${this.state.currentLong}&key=`
    fetch(url, {
      method: 'POST'
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(result => result.json())
      .then(data => {
        this.setState({
          currentCity: data.results[0].address_components[3].long_name
        }, () => this.setInitial())
      }).catch((error) => {
        console.log(error)
      });
  }


  grabGroups = () => {
    fetch('https://git.heroku.com/veggout-be.git/groups', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(response => {
        return response.json()
      }).then(json => {
        console.log('grabGroups', json)
        this.setState({
          groups: json
        })
      }).catch((error) => {
        console.log(error)
      });
  }


  searchResults = (data) => {
    this.setState({
      citySearch: data
    }, () => fetch(`https://git.heroku.com/veggout-be.git/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      body: JSON.stringify({
        citySearch: this.state.citySearch
      })
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(response => response.json())
      .then(json => {
        if (json === null) {
          this.setState({
            restaurants: []
          })
          throw Error("No Restaurants Available")
        }
        this.setState({
          restaurants: json
        })
      }).catch(err => {
        toaster.notify('Sorry, no results found.', {
          duration: 3000
        })
      })
    )
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <UnAuthRoute exact path='/signup' component={() => <Signup setUserId={this.setUserId} />} />
            <UnAuthRoute exact path='/login' component={(props) => <Login setUserId={this.setUserId} {...props} />} />
            <AuthRoute exact path='/' component={(props) => <Home {...props} restaurants={this.state.restaurants} searchResults={this.searchResults} currentLat={this.state.currentLat} currentLong={this.state.currentLong} user={this.state.user_id} groups={this.state.groups} error={this.state.errorMsg} />} />
            <AuthRoute exact path='/groups' component={(props) => <GroupContainer {...props} sendProps={this.sendProps} groups={this.state.groups} grabGroups={this.grabGroups} user={this.state.user_id} />} />
            <AuthRoute exact path='/card' component={(props) => <GroupCard {...props} user={this.state.user_id} groups={this.state.groups} sendProps={this.sendProps} grabGroups={this.grabGroups} group={this.getSingleGroup()} />} />
            <AuthRoute exact path='/logout' component={() => <Logout />} />
            <AuthRoute exact path='/resources' component={(props) => <Resources {...props} />} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;