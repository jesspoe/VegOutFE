import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import Vote from './Vote.js'
import toaster from 'toasted-notes';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavbarPage from '../component/NavbarPage'
import DatePicker from "react-datepicker";



class GroupCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: " ",
      group_id: this.props.group.id,
      editShowing: false,
      newDate: new Date(this.props.group.date),
      newName: this.props.group.name,
      newDescription: this.props.group.description
    }
  }

  handleEdit = () => {
    this.setState({
      editShowing: !this.state.editShowing
    })
  }

  handleRedirect = () => {
    this.props.history.push('/groups')
  }


  editing = (event) => {
    let data = {
      group_id: this.state.group_id,
      newDate: this.state.newDate,
      newName: this.state.newName,
      newDescription: this.state.newDescription
    }
    this.processEdit(data)
  }


  restaurantInfo = () => {
    if (this.props.group.restaurants.length > 0) {
      return this.props.group.restaurants.map((rest) => {

        return <div className="single-rest-group" >
          <div className="scroll">
            <a href={rest.website} target='blank'><h5 className="simple-title">{rest.name}</h5 ></a>
            <h5 className="c-title">{rest.veg_level_description}</h5>
            <strong> Descripton:</strong> <p>{rest.long_description ? rest.long_description : "Unavailable"} </p>
            <strong>  Price Range:</strong><p> {rest.price_range}</p>
            <strong>  Neighborhood:</strong><p> {rest.neighborhood ? rest.neighborhood : 'Unavailable'}</p>
            <strong>  Phone:</strong> <p>{rest.phone}</p>
            <strong> Address:</strong><p> {rest.address1} {rest.city}, {rest.region}</p>
            <strong> Accepts Reservations:</strong>  <p>{rest.accepts_reservations === 1 ? 'Yes' : 'No'} </p>
          </div>
        </div>
      })
    }
  }

  groupMembers = () => {
    if (this.props.group.users.length > 0) {
      return this.props.group.users.map((user) => {
        return <div className="member">{user.first_name + " " + user.last_name}</div>
      })
    } else {
      return <h5>Add some members!</h5>
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()
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
    }).then(this.props.sendProps(this.props.group))
      .then(this.props.grabGroups())
      .then(toaster.notify("Invite Sent!", {
        duration: 1500
      }))
      .catch(function (error) { console.log(" There is an error: ", error.message) })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange(date) {
    this.setState({
      newDate: date
    });
  }

  processEdit = (data) => {
    fetch(`http://localhost:3000/groups/${data.group_id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          group: {
            date: data.newDate,
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
        // this.handleRedirect()
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
      }).then(this.handleRedirect())
  }

  display = () => {
    let dateToUse = new Date(this.props.group.date);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let display;
    if (parseInt(this.props.group.user_groups[0].user_id) === parseInt(this.props.user) && this.state.editShowing) {
      display = <div className="home-page">
        <div className="container-fluid">
          <Row>
            <Col >
              <NavbarPage />
            </Col>
          </Row>

          <Row className="container-fluid">

            <Col align="left">
              <div className="group-members">
                <h5 className="text">Members in This Group</h5>
                <span>{this.groupMembers()}</span>
              </div>
            </Col>

            <Col align="right" >
              <div className="invite-box">
                <h5 className="text">Invite Friends To Join This Group!</h5>
                <form >
                  <label htmlFor='group'>Email Please: </label> {" "}
                  <input type='email' name='email' id='email' onChange={(event) => this.handleChange(event)} /> {" "}
                  <Button onClick={() => this.handleSubmit()} className='form-submit-btn' value="Add" variant="white">Add</Button>
                </form>
              </div>
            </Col>
          </Row>

          <Col align="center" className="container-fluid">
            <div className="edit-group-info">
              Event Date: <DatePicker
                selected={this.state.newDate}
                onChange={(event) => this.handleDateChange(event)}
              />
              <form onChange={(event) => this.handleChange(event)}>
                Title: <input type='text' name='newName' id='newName' value={this.state.newName} /> {" "}
                Description: <input type='text' name='newDescription' id='newDescription' value={this.state.newDescription} />
                <br />
                <Button onClick={(event) => this.editing(event)} className='form-submit-btn' value="Edit" variant="white">Make Changes</Button>
              </form>

            </div>
          </Col>

          <Row>
            <Col>
              <div className="group-restaurants">
                <h3 className="group-text">SAVED RESTAURANTS</h3>

                {this.restaurantInfo()}

                <br />
              </div>
            </Col>
          </Row>
          <Col className="container-fluid">
            <div className="group-vote">

              <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
            </div>
            < Link align="center" to='/groups'>Back to Groups</Link >
          </Col>
        </div>
      </div>

    } else if (parseInt(this.props.group.user_groups[0].user_id) === parseInt(this.props.user)) {
      display = <div className="home-page">
        <div className="container-fluid">
          <Row>
            <Col >
              <NavbarPage />
            </Col>
          </Row>

          <Row className="container-fluid">

            <Col align="left">
              <div className="group-members">
                <h5 className="text">Members in This Group</h5>
                <span>{this.groupMembers()}</span>
              </div>
            </Col>

            <Col align="right" >
              <div className="invite-box">
                <h5 className="text">Invite Friends To Join This Group!</h5>
                <form >
                  <label htmlFor='group'>Email Please: </label> {" "}
                  <input type='email' name='email' id='email' onChange={(event) => this.handleChange(event)} /> {" "}
                  <Button onClick={(event) => this.handleSubmit(event)} className='form-submit-btn' value="Add" variant="white">Add</Button>
                </form>
              </div>
            </Col>
          </Row>

          <Row>
            <Col align="center" className="container-fluid">
              <div className="group-info">
                <h1 className="group-name">{this.props.group.name}</h1>
                <p className="card-date">When: {dateToUse.toLocaleDateString("en-US", options)}</p>
                <p className="card-description">{this.props.group.description}</p>
                <div className="crudb">
                  <Button variant="white" onClick={(event) => this.handleEdit(event)}>Edit Group Info</Button>
                  <Button variant="white" onClick={() => this.handleDelete(this.state.group_id)}>Delete Group</Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="group-restaurants">
                <h3 className="group-text">SAVED RESTAURANTS</h3>

                {this.restaurantInfo()}

                <br />
              </div>
            </Col>
          </Row>
          <Col className="container-fluid">
            <div className="group-vote">
              <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
            </div>
            < Link align="center" to='/groups'>Back to Groups</Link >
          </Col>
        </div>
      </div>

    } else {
      display = <div className="home-page">
        <div className="container-fluid">
          <Row>
            <Col >
              <NavbarPage />
            </Col>
          </Row>

          <Row className="container-fluid">

            <Col align="left">
              <div className="group-members">
                <h5 className="text">Members in This Group</h5>
                <span>{this.groupMembers()}</span>
              </div>
            </Col>

            <Col align="right" >
              <div className="invite-box">
                <h5 className="text">Invite Friends To Join This Group!</h5>
                <form onChange={(event) => this.handleChange(event)}>
                  <label htmlFor='group'>Email Please: </label> {" "}
                  <input type='email' name='email' id='email' /> {" "}
                  <Button onClick={(event) => this.handleSubmit(event)} className='form-submit-btn' value="Add" variant="white">Add</Button>
                </form>
              </div>
            </Col>
          </Row>

          <Row>
            <Col align="center" className="container-fluid">
              <div className="group-info">
                <h2 className="group-name">{this.props.group.name}</h2>
                <p className="card-description">{this.props.group.description}</p>
                <p className="card-date">{dateToUse.toLocaleDateString("en-US", options)}</p>
              </div>
            </Col>
          </Row>


          <Row>
            <Col>
              <div className="group-restaurants">
                <h3 className="group-text">SAVED RESTAURANTS</h3>
                {this.restaurantInfo()}
                <br />
              </div>
            </Col>
          </Row>
          <Col className="container-fluid">
            <div className="group-vote">
              <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
            </div>
            < Link align="center" to='/groups'>Back to Groups</Link >
          </Col>
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

        </div >
      )
    } else { return "Looking for Restaurants" }
  }
}

export default GroupCard;


