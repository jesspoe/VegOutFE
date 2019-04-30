import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";


class GroupCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: " ",
      group_id: this.props.group.id
    }
  }

  handleThis = () => {
    console.log("props", this.props.group)
    this.props.handleClick()
  }


  restaurantInfo = () => {
    if (this.props.group.restaurants.length > 0) {
      return this.props.group.restaurants.map((rest) => {
        return <div>
          <a href={rest.website} target='blank'><h5>{rest.name}</h5 ></a>
          <p>City: {rest.city}</p>
        </div>
      })
    } else {
      return <h3>Add some resturants!</h3>
    }
  }

  groupMembers = () => {
    if (this.props.group.users.length > 1) {
      return this.props.group.users.map((user) => {
        return <span><h5>{user.first_name + " " + user.last_name}</h5></span>
      })
    } else {
      return <h5>Add some members!</h5>
    }
  }



  handleSubmit = event => {
    event.preventDefault()
    this.forceUpdate()
    fetch('http://localhost:3000/addUserGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.jwt}`
      },
      body: JSON.stringify({

        email: this.state.email,
        group_id: this.state.group_id

      })
    }).then(alert("Invite sent!"))
      .then(this.props.grabGroups())
      .catch(function (error) { console.log(" There is an error: ", error.message) })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }



  render() {
    return (
      <div>
        <div className="jumbotron mdb-color purple lighten-5  mx-2 mb-5">
          <h3 className="display-4 text-center">{this.props.group.name}</h3>
          <h3 className="display-7 text-center">Welcome, {this.props.group.users[0].first_name}</h3>
          <p className="lead text-right">Invite other users to join your group!</p>
          <div className="text-right">
            <form onChange={(event) => this.handleChange(event)}>
              <label htmlFor='group'>User Email: </label> {" "}
              <input type='email' name='email' id='email' /> {" "}
              <Button onClick={(event) => this.handleSubmit(event)} className='form-submit-btn' value="Add" variant="info">Add</Button>
            </form>
          </div>
          <p >Members of this group:</p>
          <span>{this.groupMembers()}</span>

          <hr className="my-4" />
          <h4>Saved Restaurants</h4>
          <div>
            {this.restaurantInfo()}
          </div>
          <Button onClick={this.handleThis}>Hide Group</Button>
        </div>

      </div>
    );
  }
}

export default GroupCard;
