import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import { MDBBtn } from "mdbreact";



class RestaurantCard extends Component {
  constructor() {
    super()
    this.state = {
      groupNum: ""
    }
  }


  populateOptions(groups) {
    return groups.map((group, index) => {
      if (group.user_groups[0].user_id === parseInt(this.props.user)) {
        return <option name="groupNum" key={index} value={group.id}>{group.name}</option>
      }
    });
  }

  handleChange = (event) => {
    this.setState({ groupNum: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("I was clicked")
    fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      body: JSON.stringify({
        group_id: this.state.groupNum,
        website: this.props.restaurant.website,
        address1: this.props.restaurant.address1,
        city: this.props.restaurant.city,
        postal_code: this.props.restaurant.postal_code,
        region: this.props.restaurant.region,
        cuisines: this.props.restaurant.cuisines,
        name: this.props.restaurant.name,
        phone: this.props.restaurant.phone,
        price_range: this.props.restaurant.price_range,
        short_descrition: this.props.restaurant.short_description,
        veg_level_description: this.props.restaurant.veg_level_description
      })
    })
  }

  render() {
    return (
      <Container >
        <div class="card border-secondary mb-3">
          <div class="card-header">
            <a href={this.props.restaurant.website} target='blank'><h5 class="card-title">{this.props.restaurant.sortable_name}</h5 ></a>
          </div>
          <div class="card-body">
            <p class="card-text"><strong>Price Range:</strong> <span>{this.props.restaurant.price_range}</span></p>
            <p class="card-text"><strong>Neighborhood:</strong> <span>{this.props.restaurant.neighborhood ? this.props.restaurant.neighborhood : 'Unavailable'}</span></p>
            <p class="card-text"><strong>Phone:</strong> <span>{this.props.restaurant.phone}</span></p>
            <p class="card-text"><strong>Address:</strong> <span>{this.props.restaurant.address1} {this.props.restaurant.city}, {this.props.restaurant.region}</span></p>
            <p class="card-text"><strong>Accepts Reservations:</strong> <span>{this.props.restaurant.accepts_reservations === 1 ? 'Yes' : 'No'} </span></p>
            <MDBBtn onClick={this.props.handleClick} type="button" class="btn btn-outline-secondary waves-effect btn-sm">Go Back</MDBBtn>

            <form onChange={(event) => { this.handleChange(event) }} >
              <select class="browser-default custom-select">
                <option>Choose a Group</option>
                {this.populateOptions(this.props.groups)}
              </select>
              <MDBBtn onClick={(event) => this.handleSubmit(event)} type="submit" class="btn btn-outline-secondary waves-effect btn-sm">Add Restaurant to Group</MDBBtn>
            </form>

          </div>
        </div>
      </Container>
    );
  }
}

export default RestaurantCard;



// <select class="browser-default custom-select">
//   <option selected>Select Your Group</option>
//   <option value="1">One</option>
//   <option value="2">Two</option>
//   <option value="3">Three</option>
// </select>

//   <div className="browser-default custom-select">
//     <select>
//       {this.state.options.map((option, key) => <option key={key} >{option}</option>)}
//     </select>
//   </div>