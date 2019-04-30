import React, { Component } from 'react';
import Restaurant from '../component/Restaurant'

class RestaurantContainer extends Component {
  render() {
    return (
      <div>
        {console.log("props", this.props)}
        {this.props.restaurants.map((restaurant, index) => {
          return <Restaurant key={index} restaurant={restaurant} groups={this.props.groups} user={this.props.user} />
        })}
      </div>
    );
  }
}

export default RestaurantContainer;
