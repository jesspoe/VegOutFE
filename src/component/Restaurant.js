import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard'
import { MDBBtn } from "mdbreact";

class Restaurant extends Component {
  constructor() {
    super()
    this.state = {
      isShowing: true
    }
  }

  handleClick = () => {
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
        <div className="single-rest">
          <div className="card border-secondary mb-3">
            <div className="card-header" backgroundColor="gray">
              <a href={this.props.restaurant.website} target='blank'><h5 className="card-title">{this.props.restaurant.sortable_name}</h5 ></a>
            </div>
            <div className="card-body">
              <h5 className="card-title">{this.props.restaurant.veg_level_description}</h5>
              <h5 className="card-text"> Cuisine Type: <span>{this.cuisines()}</span></h5>
              <MDBBtn onClick={this.handleClick} type="button" className="btn btn-outline-default waves-effect btn-sm">More Info</MDBBtn>
            </div>
          </div>
        </div>
        :

        <RestaurantCard handleClick={this.handleClick} restaurant={this.props.restaurant} cuisines={this.cuisines} groups={this.props.groups} user={this.props.user} />

    );
  }
}

export default Restaurant;












