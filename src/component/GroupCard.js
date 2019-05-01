import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'


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
        return <div className="group-rest">
          <a href={rest.website} target='blank'><h5>{rest.name}</h5 ></a>
          <p>City: {rest.city}</p>
          <p> {rest.veg_level_description}</p>
        </div>
      })
    } else {
      return <h3>Add some resturants!</h3>
    }
  }

  groupMembers = () => {
    if (this.props.group.users.length > 1) {
      return this.props.group.users.map((user) => {
        return <div className="member">{user.first_name + " " + user.last_name}</div>
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
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(alert("Invite sent!"))
      .then(this.props.grabGroups())
      .catch(function (error) { console.log(" There is an error: ", error.message) })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  handleEdit = (group) => {
    fetch(`http://localhost:3000/groups/${group.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          group: {
            name: group.name,
            description: group.description
          }
        }),
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      }).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        return response;
      })
      .then((json) => {
        this.props.grabGroups()
      });
  }

  handleClick = () => {

  }


  render() {
    return (
      <div>
        <div className="jumbotron mdb-color grey lighten-4  mx-2 mb-5">
          <h3 className="display-5 text-center">{this.props.group.name}</h3>
          <p className="lead text-right">Invite friends to join your group!</p>
          <div className="text-right">
            <form onChange={(event) => this.handleChange(event)}>
              <label htmlFor='group'>Email Please: </label> {" "}
              <input type='email' name='email' id='email' /> {" "}
              <Button onClick={(event) => this.handleSubmit(event)} className='form-submit-btn' value="Add" variant="white">Add</Button>
            </form>
          </div>
          <div className="group-text">Group Members</div>
          <span>{this.groupMembers()}</span>

          <hr className="my-4" />
          <div className="group-text" s>Saved Restaurants</div>
          <div >
            {this.restaurantInfo()}
          </div>
          <br />
          <Button variant="white" onClick={this.handleThis}>Close Group</Button>
          <Button variant="white" onClick={this.handleEdit}>Edit Group</Button>
          <Button variant="white" onClick={this.handleDelete}>Delete Group</Button>

        </div>

      </div>
    );
  }
}

export default GroupCard;
{/* <span className="card-title">{this.props.group.name}</span>{" "}<span><i onClick={this.handleClick} class="fas fa-pencil-alt"></i></span> */ }