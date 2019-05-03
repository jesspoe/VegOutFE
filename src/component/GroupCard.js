import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Vote from './Vote.js'



class GroupCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: " ",
      group_id: this.props.group.id,
      editShowing: false,
      newName: this.props.group.name,
      newDescription: this.props.group.description
    }

  }

  componentDidMount() {
    this.display()
    console.log("showing props", this.props)
  }

  handleThis = () => {
    console.log("props", this.props.group)
    console.log("group creator id", this.props.group.user_groups[0].user_id)
    console.log("current user id", this.props.user)
  }

  handleEdit = () => {
    this.setState({
      editShowing: !this.state.editShowing
    })
  }


  editing = (event) => {
    event.preventDefault()
    let data = {
      group_id: this.state.group_id,
      newName: this.state.newName,
      newDescription: this.state.newDescription
    }
    this.processEdit(data)
    this.handleEdit()
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


  processEdit = (data) => {
    fetch(`http://localhost:3000/groups/${data.group_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          group: {
            name: data.newName,
            description: data.newDescription
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

  handleDelete = (id) => {
    fetch(`http://localhost:3000/groups/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}`
        }
      }).then((response) => {
        this.props.grabGroups()
      })
  }

  display = () => {
    let display;
    if (parseInt(this.props.group.user_groups[0].user_id) === parseInt(this.props.user) && this.state.editShowing) {
      display = <div className="container-fluid">
        <div className="jumbotron mdb-color grey lighten-4  mx-2 mb-5">
          <div className="text">
            <form onChange={(event) => this.handleChange(event)}>
              <h3 className="display-5 text-left">{this.props.group.name}</h3>
              <input type='text' name='newName' id='newName' value={this.state.newName} /> {" "}
              <p className="display-5 text-left">{this.props.group.description}</p>
              <input type='text' name='newDescription' id='newDescription' value={this.state.newDescription} /> {" "}
              <Button onClick={(event) => this.editing(event)} className='form-submit-btn' value="Edit" variant="white">Make Changes</Button>
            </form>
          </div>
          <div className="group-text">Group Members</div>
          <span>{this.groupMembers()}</span>

          <hr className="my-4" />
          <div className="group-text">Saved Restaurants</div>
          <div >
            {this.restaurantInfo()}
          </div>
          <br />
          < Link to='/groups'>Back to Groups</Link >
          <Button variant="white" onClick={() => this.handleDelete(this.state.group_id)}>Delete Group</Button>
        </div>
      </div>

    } else if (parseInt(this.props.group.user_groups[0].user_id) === parseInt(this.props.user)) {
      display = <div className="container-fluid">
        <div className="jumbotron mdb-color grey lighten-4  mx-2 mb-5">
          <h3 className="display-5 text-left">{this.props.group.name}</h3>
          <p className="display-5 text-left">{this.props.group.description}</p>
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
          < Link to='/groups'>Back to Groups</Link >
          <Button variant="white" onClick={this.handleEdit}>Edit Group Info</Button>
          <Button variant="white" onClick={() => this.handleDelete(this.state.group_id)}>Delete Group</Button>
        </div>
      </div>

    } else {
      display = display = <div className="container-fluid">
        <div className="jumbotron mdb-color grey lighten-4  mx-2 mb-5">
          <h3 className="display-5 text-left">{this.props.group.name}</h3>
          <p className="display-5 text-left">{this.props.group.description}</p>
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
          < Link to='/groups'>Back to Groups</Link >
        </div>
      </div>

    }
    return display

  }

  render() {
    if (this.state.group_id) {
      return (
        <div>
          {this.display()}
          <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
        </div >
      )
    } else { return "No Restaurants Available" }

  }
}

export default GroupCard;
