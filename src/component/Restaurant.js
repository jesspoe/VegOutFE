import React from 'react';

const Restaurant = props => {
  return (
    <React.Fragment>
      <div className='single-rest'>
        <a href={props.restaurant.website} target='blank'><h3>{props.restaurant.sortable_name}</h3 ></a>
        Neighborhood: <span>{props.restaurant.neighborhood ? props.restaurant.neighborhood : 'Unavailable'}</span>
        <br />
        Price: <span>{props.restaurant.price_range}</span>
      </div>
    </React.Fragment>
  )
}
export default Restaurant;

