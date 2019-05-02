import React, { Component } from 'react';
import Restaurant from '../component/Restaurant'

class RestaurantContainer extends Component {
  restaurants = () => {
    if (this.props.restaurants === null) {
      return true
    }
  }

  render() {
    return (
      <div>
        {
          this.restaurants() ? this.props.error :

            this.props.restaurants.map((restaurant, index) => {
              return <Restaurant key={index} restaurant={restaurant} groups={this.props.groups} user={this.props.user} />
            })

        }
      </div>
    );
  }
}

export default RestaurantContainer;
