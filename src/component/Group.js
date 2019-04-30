import Card from 'react-bootstrap/Card'
import React, { Component } from 'react';
import GroupCard from './GroupCard'
import Button from 'react-bootstrap/Button'

class Group extends Component {
  constructor() {
    super()
    this.state = {
      isClicked: false
    }
  }

  handleClick = () => {
    console.log("clicked bb")
    this.setState({ isClicked: !this.state.isClicked })
  }

  render() {

    return (
      <div>
        {this.state.isClicked ? <GroupCard group={this.props.group} isClicked={this.state.isClicked} handleClick={this.handleClick} /> :
          <Card className="group-card-single" border="info" style={{ width: '18rem' }} >
            <Card.Header>{this.props.group.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                {this.props.group.description}
              </Card.Text>
              <Button onClick={this.handleClick}>I'm Here</Button>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}


export default Group;

