import React, { Component } from 'react';
import Results from './Results'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
      isShowing: !this.state.isShowing
    })
  }

  getVotes = () => {
    fetch('https://veggout-be.herokuapp.com/getVotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.jwt}` },
      body: JSON.stringify({

        group_id: this.props.group.id,

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


  castVotes = (rest) => {
    fetch('https://veggout-be.herokuapp.com/votes', {
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
    if (this.props) {
      return (
        this.state.isShowing ?
          <div className="container-fluid">
            <Row> <Col align="center" xs={12}><h3 className="group-text">VOTE!</h3> </Col></Row>
            <Row> <Col align="center" xs={12}><p className="text" onClick={() => this.getVotes()}>See where we're heading..</p></Col></Row>

            {this.props.group.restaurants.map((rest) => {
              if (rest.name === undefined) {
                return
              } else {
                return <div className="container-fluid">
                  <Row> <Col align="center" xs={12} className="vote-name">{rest.name} <button className="vote-btn" onClick={() => this.castVotes(rest.name)}>Vote</button></Col></Row>

                </div>
              }
            })
            }
          </div>
          :
          <Results showing={this.showResults} percent={this.state.percents} total={this.state.total} />

      );
    } else { return null }
  }
}


export default Vote;

