import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

class GroupCard extends Component {
  constructor(props) {
    super(props)
  }

  handleThis = () => {
    console.log("pros", this.props.group)
    this.props.handleClick()
  }

  render() {



    return (
      <div class="jumbotron">
        <h3 class="display-4">Group: {this.props.group.name}</h3>
        <h3 class="display-7">Welcome, {this.props.group.users[0].first_name}</h3>
        <p class="lead">Invite other users to join your group!</p>
        <hr class="my-4" />
        <h4>Saved Restaurants</h4>
        <p>{this.props.group.restaurants[0].name}</p>
        <Button onClick={this.handleThis}>Hide Group</Button>
      </div>
    );
  }
}

export default GroupCard;
