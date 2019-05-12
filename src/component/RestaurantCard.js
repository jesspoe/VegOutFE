import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import toaster from 'toasted-notes';



class RestaurantCard extends Component {
  constructor() {
    super()
    this.state = {
      groupNum: ""
    }
  }


  populateOptions(groups) {
    return groups.map((group, index) => {
      for (let i = 0; i < group.user_groups.length; i++) {
        if (group.user_groups[i].user_id === parseInt(this.props.user)) {
          return <option name="groupNum" key={index} value={group.id}>{group.name}</option>
        }
      }
    });
  }

  handleChange = (event) => {
    console.log('handle change event', event)
    this.setState({ groupNum: event.target.value });
  }

  handleSubmit = (event) => {

    event.preventDefault()
    fetch('https://veggout-be.herokuapp.com/restaurants', {
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
        long_description: this.props.restaurant.long_description === undefined ? "Unavailable" : this.props.restaurant.long_description["text/vnd.vegguide.org-wikitext"],
        veg_level_description: this.props.restaurant.veg_level_description
      })
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(toaster.notify('Restaurant Added!', {
      duration: 1000
    }))
      .catch((error) => {
        console.log(error)
      });
  }

  render() {


    return (
      <div className="single-rest" >
        <div className="card border-secondary mb-3">
          <div className="card-header">
            <a href={this.props.restaurant.website} target='blank'><h5 className="card-title">{this.props.restaurant.sortable_name}</h5 ></a>
          </div>
          <div className="card-body">
            <p className="card-text"><strong>Price Range:</strong> <span>{this.props.restaurant.price_range}</span></p>
            <p className="card-text"><strong>Neighborhood:</strong> <span>{this.props.restaurant.neighborhood ? this.props.restaurant.neighborhood : 'Unavailable'}</span></p>
            <p className="card-text"><strong>Phone:</strong> <span>{this.props.restaurant.phone}</span></p>
            <p className="card-text"><strong>Address:</strong> <span>{this.props.restaurant.address1} {this.props.restaurant.city}, {this.props.restaurant.region}</span></p>
            <p className="card-text"><strong>Accepts Reservations:</strong> <span>{this.props.restaurant.accepts_reservations === 1 ? 'Yes' : 'No'} </span></p>
            <p className="card-text"><strong>Descripton: </strong><span>{this.props.restaurant.long_description === undefined ? "Unavailable" : this.props.restaurant.long_description["text/vnd.vegguide.org-wikitext"]}</span> </p>
            <h6>Add this restaurant to a group.</h6>
            <form onChange={(event) => { this.handleChange(event) }} onSubmit={(event) => this.handleSubmit(event)}>
              <select className="browser-default custom-select">
                <option>Select a Restaurant</option>
                {this.populateOptions(this.props.groups)}
              </select>
              <MDBBtn type="submit" className="btn btn-outline-default waves-effect btn-sm">Add </MDBBtn>
            </form>

            <MDBBtn onClick={this.props.handleClick} type="button" className="btn btn-outline-default waves-effect btn-sm">Less Info</MDBBtn>

          </div>
        </div>
      </div >
    );
  }
}

export default RestaurantCard;

