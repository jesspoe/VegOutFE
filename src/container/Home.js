import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
import RestaurantContainer from './RestaurantContainer';
import NavBar from '../component/NavBar'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 0,
      first_name: "",
      last_name: "",
      email: ""
    }
  }
  componentDidMount() {
    let jwt = window.localStorage.getItem("jwt")
    let result = jwtDecode(jwt)
    this.setState({ first_name: result.first_name, last_name: result.last_name, user_id: result.user_id, email: result.email })
  }

  render() {
    return (
      <div>
        <NavBar />
        <RestaurantContainer restaurants={this.props.restaurants} />
      </div>
    );
  }
}

export default Home;