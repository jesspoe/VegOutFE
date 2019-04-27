import React from 'react';

const Restaurant = props => {


  return (
    <React.Fragment>
      <div className='single-rest' onClick={() => this.handleClick}>
        <a href={props.restaurant.website} target='blank'><h5>{props.restaurant.sortable_name}</h5 ></a>
        Neighborhood: <span>{props.restaurant.neighborhood ? props.restaurant.neighborhood : 'Unavailable'}</span>
        <br />
        Price: <span>{props.restaurant.price_range}</span>
      </div>
    </React.Fragment>
  )
}
export default Restaurant;

