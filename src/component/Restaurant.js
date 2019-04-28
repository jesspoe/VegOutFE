import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard'
import Button from 'react-bootstrap/Button'

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
        <React.Fragment>
          <div className='single-rest' >
            <a href={this.props.restaurant.website} target='blank'><h5>{this.props.restaurant.sortable_name}</h5 ></a>
            Cuisine: <span>{this.cuisines()}</span>
          </div>
          <Button onClick={this.handleClick}>More Info</Button>
        </React.Fragment>
        :

        <RestaurantCard handleClick={this.handleClick} restaurant={this.props.restaurant} cuisines={this.cuisines} />

    );
  }
}

export default Restaurant;












