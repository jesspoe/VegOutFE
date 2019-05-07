import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CloseUp from '../Images/close-up-colors-farm-produce-244393.jpg'


class Group extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div >
        <div className="card">
          <img class="card-img-top" src={CloseUp} alt="Card image cap"></img>
          <div className="card-body">
            <h3 className="card-title">{this.props.group.name}</h3>
            <p className="card-text"> {this.props.group.description}</p>
            <div className="group-card-button"><Link to='/card'><p onClick={() => this.props.sendProps(this.props.group)}>Come Inside</p></Link></div>
          </div>
        </div>
      </div>
    );
  }

}

export default Group;

