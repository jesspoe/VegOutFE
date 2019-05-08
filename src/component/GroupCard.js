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

  componentDidMount() {
    this.display()
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
          <div className="card-header" backgroundColor="gray">
            <a href={rest.website} target='blank'><h5 className="card-title">{rest.name}</h5 ></a>
          </div>
          <div className="card-body">
            <h5 className="card-title">{rest.veg_level_description}</h5>
          </div>

          <div className="card-body">
            <p className="card-text"><strong>Price Range:</strong> <span>{rest.price_range}</span></p>
            <p className="card-text"><strong>Neighborhood:</strong> <span>{rest.neighborhood ? rest.neighborhood : 'Unavailable'}</span></p>
            <p className="card-text"><strong>Phone:</strong> <span>{rest.phone}</span></p>
            <p className="card-text"><strong>Address:</strong> <span>{rest.address1} {rest.city}, {rest.region}</span></p>
            <p className="card-text"><strong>Accepts Reservations:</strong> <span>{rest.accepts_reservations === 1 ? 'Yes' : 'No'} </span></p>
          </div>
        </div >

      })
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
      .then(toaster.notify("Invite Sent!", {
        duration: 1500
      }))
      .then(this.props.grabGroups())
      .then(this.groupMembers())
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
        this.handleRedirect()
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
                <h3 className="group-text">Members in This Group</h3>
                <span>{this.groupMembers()}</span>
              </div>
            </Col>

            <Col align="right" >
              <div className="invite-box">
                <h5 className="group-text">Invite Friends To Join This Group!</h5>
                <form onChange={(event) => this.handleChange(event)}>
                  <label htmlFor='group'>Email Please: </label> {" "}
                  <input type='email' name='email' id='email' /> {" "}
                  <Button onClick={(event) => this.handleSubmit(event)} className='form-submit-btn' value="Add" variant="white">Add</Button>
                </form>
              </div>
            </Col>
          </Row>

          <Col align="center" className="container-fluid">
            <div className="group-info">
              <form onChange={(event) => this.handleChange(event)}>
                <h3 >{this.props.group.name}</h3>
                <input type='text' name='newName' id='newName' value={this.state.newName} /> {" "}
                <p>{this.props.group.description}</p>
                <input type='text' name='newDescription' id='newDescription' value={this.state.newDescription} /> {" "}
                <Button onClick={(event) => this.editing(event)} className='form-submit-btn' value="Edit" variant="white">Make Changes</Button>
              </form>
              Event Date: <DatePicker
                selected={this.state.newDate}
                onChange={(event) => this.handleDateChange(event)}
              />
            </div>
          </Col>

          <Row>
            <Col>
              <div className="group-restaurants">
                <h3 className="group-text">Saved Restaurants</h3>
                <div>
                  {this.restaurantInfo()}
                </div>
                <br />
                < Link to='/groups'>Back to Groups</Link >
              </div>
            </Col>
          </Row>
          <Col className="container-fluid">
            <div className="group-vote">
              <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
            </div>
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
                <h3 className="group-text">Group Members</h3>
                <span>{this.groupMembers()}</span>
              </div>
            </Col>

            <Col align="right" >
              <div className="invite-box">
                <h5 className="group-text">Invite Friends To Join This Group!</h5>
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
                <h3 className="group-text">Saved Restaurants</h3>
                <div>
                  {this.restaurantInfo()}
                </div>
                <br />
                < Link to='/groups'>Back to Groups</Link >
              </div>
            </Col>
          </Row>
          <Col className="container-fluid">
            <div className="group-vote">
              <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
            </div>
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
                <h3 className="group-text">Group Members</h3>
                <span>{this.groupMembers()}</span>
              </div>
            </Col>

            <Col align="right" >
              <div className="invite-box">
                <h5 className="group-text">Invite Friends To Join This Group!</h5>
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
                <h2 className="card-name">{this.props.group.name}</h2>
                <p className="card-description">{this.props.group.description}</p>
                <p className="card-date">{dateToUse.toLocaleDateString("en-US", options)}</p>
              </div>
            </Col>
          </Row>


          <Row>
            <Col>
              <div className="group-restaurants">
                <h3 className="group-text">Saved Restaurants</h3>
                <div>
                  {this.restaurantInfo()}
                </div>
                <br />
                < Link to='/groups'>Back to Groups</Link >
              </div>
            </Col>
          </Row>
          <Col className="container-fluid">
            <div className="group-vote">
              <Vote groups={this.props.groups} group_id={this.state.group_id} group={this.props.group} />
            </div>
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


