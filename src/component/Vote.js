import React, { Component } from 'react';
import Results from './Results'

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counts: {},
      percents: {},
      total: 0,
      isShowing: true
    }
  }


  renderNames = () => {
    this.props.group.restaurants.map((rest, index) => {
      if (rest.name === undefined) {
        return
      }
    })
  }

  showResults = () => {
    this.setState({
      isShowing: false
    })
  }


  castVotes = (rest) => {
    fetch('http://localhost:3000/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      body: JSON.stringify({
        vote: {
          group_id: this.props.group.id,
          rest_name: rest
        }
      })
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(response => response.json())
      .then(json => {
        console.log("filtered json", json)
        this.setState({
          counts: json.counts,
          total: json.total,
          percents: json.percents
        })
      }).then(this.showResults())
      .catch((error) => {
        console.log(error)
      })
  }

  render() {

    return (
      this.state.isShowing ?
        <div>
          {this.props.group.restaurants.map((rest) => {
            if (rest.name === undefined) {
              return
            } else {
              return <div>
                {rest.name}
                <button onClick={() => this.castVotes(rest.name)}>Vote</button>
              </div>
            }
          })
          }
        </div>
        :
        <Results percent={this.state.percents} />

    );
  }
}


export default Vote;

