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
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(() => this.props.grabGroups()
      ).catch(function (error) { console.log(" There is an error: ", error.message) })
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
          <Col align="right" className="group-form">
            <div>
              <form className="user-form" onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                <label htmlFor='group'>Group Name: </label> {" "}
                <input type='text' name='name' id='groupName' /> {" "}
                <br />
                <label htmlFor='group'>Description: </label> {" "}
                <input type='text' name='description' id='groupDescription' /> <br />
                <Button className='form-submit-btn' type='submit' value="Add" variant="white" >Add a New Group</Button>
              </form>
            </div>
          </Col>
        </Row>

        <div className="single-group-card">
          <h3>Your Groups:</h3>
          {this.props.groups.map((group, index) => {
            for (let i = 0; i < group.user_groups.length; i++) {
              if (group.user_groups[i].user_id === parseInt(this.props.user)) {
                return <div className="single-group"><Group group={group} key={index} grabGroups={this.props.grabGroups} user={this.props.user} /></div>
              }
            }
          })
          }
        </div>

      </Container>
    );
  }
}

export default GroupContainer;
