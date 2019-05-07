import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CloseUp from '../Images/close-up-colors-farm-produce-244393.jpg'


class Group extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div>
        <div className="card">
          <img class="card-img-top" src={CloseUp} alt="Card image cap"></img>
          <div className="card-body">
            <h3 className="card-title">{this.props.group.name}</h3>
            <p className="card-text"> {this.props.group.description}</p>
            <Link to='/card'><p onClick={() => this.props.sendProps(this.props.group)}>Come Inside</p></Link>
          </div>
        </div>
      </div>
    );
  }

}

export default Group;


// <!-- Card -->
// <div class="card">

//   <!-- Card image -->
//   <img class="card-img-top" src="/Images/close-up-colors-farm-produce-244393" alt="Card image cap">

//   <!-- Card content -->
//   <div class="card-body">

//     <!-- Title -->
//     <h4 class="card-title"><a>Card title</a></h4>
//     <!-- Text -->
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <!-- Button -->
//     <a href="#" class="btn btn-primary">Button</a>

//   </div>

// </div>
// <!-- Card --></div>