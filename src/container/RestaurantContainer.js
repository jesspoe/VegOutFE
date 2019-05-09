import React, { Component } from 'react';
import Restaurant from '../component/Restaurant'

class RestaurantContainer extends Component {

  render() {
    if (this.props.restaurants.length > 0) {
      return (
        <div >
          {
            this.props.restaurants.map((restaurant, index) => {
              return <Restaurant key={index} restaurant={restaurant} groups={this.props.groups} user={this.props.user} />
            })
          }
        </div>
      )
    } else { return null }
  }
}

export default RestaurantContainer;
