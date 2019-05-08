import React, { Component } from 'react';
import Group from '../component/Group'
import NavbarPage from '../component/NavbarPage'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import toaster from 'toasted-notes';
import DatePicker from "react-datepicker";
import Cauli from '../Images/cauli.jpg'
import Onion from '../Images/onion.jpg'
import Green from '../Images/greenbell.jpg'
import Food from '../Images/food.jpg'
import Tom from '../Images/tomo.jpg'
import Chips from '../Images/chips.jpg'
import Zuc from '../Images/zuc.jpg'

let imgArray = [Cauli, Onion, Green, Food, Tom, Chips, Zuc];
console.log("Img array", imgArray)




class GroupContainer extends Component {
  constructor() {
    super()
    this.state = {
      name: " ",
      description: "",
      date: new Date()
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.forceUpdate()
    fetch('http://localhost:3000/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.jwt}`
      },
      body: JSON.stringify({
        group: {
          name: this.state.name,
          description: this.state.description,
          date: this.state.date
        }
      })
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(() => this.props.grabGroups()
      ).then(toaster.notify('Group Created!', {
        duration: 1000
      }))
      .catch(function (error) { console.log(" There is an error: ", error.message) })
  }


  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  gotGroups = () => {
    if (this.props.groups > 0) {
      return true
    }
  }

  render() {
    return (
      <div className="home-page">
        <div className="container-fluid">

          <Row>
            <Col xs={12} md={12}>
              <NavbarPage />
            </Col>
          </Row>

          <div className="group-form">
            <h5 className="group-text">Create a New Group</h5>
            <Row>
              <Col className="container-fluid">

                Event Date: <DatePicker
                  selected={this.state.date}
                  onChange={(event) => this.handleDateChange(event)}
                /> <form className="user-form" onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                  <label htmlFor='group'>Group Name: </label> {" "}
                  <input type='text' name='name' id='groupName' />
                  <br />
                  <label htmlFor='group'>Description: </label> {" "}
                  <input type='text' name='description' id='groupDescription' /><br />
                  <Button className='form-submit-btn' type='submit' value="Add" variant="white" >Save</Button>
                </form>

              </Col>
            </Row>
          </div>
          <div className='container-fluid'>
            <h4 className="group-text">Group List</h4>
            <div className="row">
              {this.props.groups.map((group, index) => {
                let randomImg = imgArray[Math.floor(Math.random() * imgArray.length)];
                for (let i = 0; i < group.user_groups.length; i++) {
                  if (group.user_groups[i].user_id === parseInt(this.props.user)) {
                    return <Group img={randomImg} sendProps={this.props.sendProps} group={group} key={index} grabGroups={this.props.grabGroups} user={this.props.user} />
                  }
                }
              })

              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default GroupContainer;
