import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard'
import { MDBBtn } from "mdbreact";
import Container from 'react-bootstrap/Container'

class Restaurant extends Component {
  constructor() {
    super()
    this.state = {
      isShowing: true
    }
  }

  handleClick = () => {
    console.log("im in the click")
    this.setState({
      isShowing: !this.state.isShowing
    })
  }

  cuisines = () => {

    return this.props.restaurant.cuisines.map((type) => {
      return type + " "
    })
  }

  render() {
    return (
      this.state.isShowing ?
        <Container >
          <div class="card border-secondary mb-3">
            <div class="card-header">
              <a href={this.props.restaurant.website} target='blank'><h5 class="card-title">{this.props.restaurant.sortable_name}</h5 ></a>
            </div>
            <div class="card-body">
              <h5 class="card-title">{this.props.restaurant.veg_level_description}</h5>
              <h5 class="card-text"> Cuisine Type: <span>{this.cuisines()}</span></h5>
              <MDBBtn onClick={this.handleClick} type="button" class="btn btn-outline-secondary waves-effect btn-sm">More Info</MDBBtn>
            </div>
          </div>
        </Container>
        :

        <RestaurantCard handleClick={this.handleClick} restaurant={this.props.restaurant} cuisines={this.cuisines} groups={this.props.groups} user={this.props.user} />

    );
  }
}

export default Restaurant;












