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
        {this.state.isClicked ? <GroupCard group={this.props.group} grabGroups={this.props.grabGroups} isClicked={this.state.isClicked} handleClick={this.handleClick} /> :
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{this.props.group.name}</h5>
              <p className="card-text"> {this.props.group.description}</p>
              <Button variant="info" onClick={this.handleClick}>I'm Here</Button>
            </div>
          </div>
        }
      </div>
    );
  }
}


export default Group;

