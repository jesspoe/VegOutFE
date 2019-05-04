import React, { Component } from 'react';

class Vote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counts: {},
      total: 0
    }
  }



  renderPercents = (rest) => {
    let final;
    this.state.counts.map((item) => {
      if (rest.name === item) {
        return final = this.state.total / item.value
      }
    })

  }

  renderNames = () => {
    this.props.group.restaurants.map((rest, index) => {
      if (rest.name === undefined) {
        return
      }
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
      (console.log("count response", response))
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(response => response.json())
      .then(json => {
        console.log("filtered json", json)
        this.setState({
          counts: json.counts,
          total: json.total
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {

    return (
      <div></div>
    );
  }
}

export default Vote;

