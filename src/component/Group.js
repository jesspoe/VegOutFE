import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Group extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{this.props.group.name}</h3>
            <p className="card-text"> {this.props.group.description}</p>
            <Link to='/card'><p onClick={() => this.props.sendProps(this.props.group)}>Show Cards</p></Link>
          </div>
        </div>
      </div>
    );
  }

}

export default Group;

// render() {

//   return (
//     <div>
//       {this.state.isClicked ? <GroupCard group={this.props.group} grabGroups={this.props.grabGroups} user={this.props.user} isClicked={this.state.isClicked} handleClick={this.handleClick} /> :
//         <div className="card">
//           <div className="card-body">
//             <h3 className="card-title">{this.props.group.name}</h3>
//             <p className="card-text"> {this.props.group.description}</p>
//             <Button variant="info" onClick={this.handleClick}>I'm Here</Button>
//           </div>
//         </div>
//       }
//     </div>
//   );
// }
// }
