import React, { Component } from 'react';
import Group from '../component/Group'
import Container from 'react-bootstrap/Container'
import NavbarPage from '../component/NavbarPage'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class GroupContainer extends Component {
  constructor() {
    super()
    this.state = {
      name: " ",
      description: ""
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
          description: this.state.description
        }
      })
    }).then(() => this.props.grabGroups())
      // .then(() => this.myGroups())
      .catch(function (error) { console.log(" There is an error: ", error.message) })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }





  render() {
    return (
      <Container>

        <Row>
          <Col xs={12} md={12}>
            <NavbarPage />
          </Col>
        </Row>

        <Row>
          <Col align="center">Your Groups</Col>
        </Row>

        <Row>
          <Col align="center" className="group-form">
            <div>
              <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                <h5>Create A New Group</h5><br />
                <label htmlFor='group'>Group Name: </label> {" "}
                <input type='text' name='name' id='groupName' /> {" "}

                <label htmlFor='group'>Description: </label> {" "}
                <input type='text' name='description' id='groupDescription' />
                <Button className='form-submit-btn' type='submit' value="Add" variant="info">Add</Button>
              </form>
            </div>
          </Col>
        </Row>

        <h5>Your Groups</h5>

        {this.props.groups.map((group) => {
          if (group.user_groups[0].user_id === parseInt(this.props.user)) {
            return <Group group={group} />
          }
        })
        }

      </Container>
    );
  }
}

export default GroupContainer;