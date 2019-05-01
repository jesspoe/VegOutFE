import React, { Component } from 'react';
import GroupCard from './GroupCard'
import Button from 'react-bootstrap/Button'

class Group extends Component {
  constructor() {
    super()
    this.state = {
      isClicked: false,
      showEdit: false
    }
  }

  handleClick = () => {
    this.setState({ isClicked: !this.state.isClicked })
  }



  render() {

    return (
      <div>
        {this.state.isClicked ? <GroupCard group={this.props.group} grabGroups={this.props.grabGroups} user={this.props.user} isClicked={this.state.isClicked} handleClick={this.handleClick} /> :
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{this.props.group.name}</h3>
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

