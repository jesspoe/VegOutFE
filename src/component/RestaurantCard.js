import React from 'react';
import Container from 'react-bootstrap/Container'
import { MDBBtn } from "mdbreact";


const RestaurantCard = props => {


  return (
    <Container >
      <div class="card border-secondary mb-3">
        <div class="card-header">
          <a href={props.restaurant.website} target='blank'><h5 class="card-title">{props.restaurant.sortable_name}</h5 ></a>
        </div>
        <div class="card-body">
          <p class="card-text"><strong>Price Range:</strong> <span>{props.restaurant.price_range}</span></p>
          <p class="card-text"><strong>Neighborhood:</strong> <span>{props.restaurant.neighborhood ? props.restaurant.neighborhood : 'Unavailable'}</span></p>
          <p class="card-text"><strong>Phone:</strong> <span>{props.restaurant.phone}</span></p>
          <p class="card-text"><strong>Address:</strong> <span>{props.restaurant.address1} {props.restaurant.city}, {props.restaurant.region}</span></p>
          <p class="card-text"><strong>Accepts Reservations:</strong> <span>{props.restaurant.accepts_reservations === 1 ? 'Yes' : 'No'} </span></p>
          <MDBBtn onClick={props.handleClick} type="button" class="btn btn-outline-secondary waves-effect btn-sm">Go Back</MDBBtn>
        </div>
      </div>
    </Container>
  )
}
export default RestaurantCard;

