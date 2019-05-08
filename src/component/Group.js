import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Group extends Component {
  constructor() {
    super()
  }

  render() {
    let dateToUse = new Date(this.props.group.date);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (

      <div className="card" id="rest-card">
        <img class="card-img-top" src={this.props.img} alt="Card image cap"></img>
        <div className="card-body">
          <h3 className="card-title">{this.props.group.name}</h3>
          {dateToUse.toLocaleDateString("en-US", options)}<br />
          <p className="card-text"> {this.props.group.description}</p>
          <div><Link to='/card'><p className="button-text" onClick={() => this.props.sendProps(this.props.group)}>More...</p></Link></div>
        </div>
      </div>

    );
  }

}

export default Group;




