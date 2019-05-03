import React, { Component } from 'react';
import Poll from 'react-polls';



class Vote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pollAnswers: [],
      pollQuestion: 'Vote for your favorite restaurant!'
    }

  }


  componentDidMount() {
    this.restaurantNames()
    this.pollAnswers()
    console.log("showing poll answers", this.state.pollAnswers)
  }


  restaurantNames = () => {
    debugger
    return this.props.group.restaurants.map((rest, index) => {
      return rest.name

    })
  }

  pollAnswers = () => {
    let answers = []
    this.restaurantNames().map((rest, index) => {
      if (rest === undefined) {
        return
      } else {
        answers.push({ option: rest, votes: 0 })
      }
    })
    return this.setState({ pollAnswers: answers })
  }


  // Handling user vote
  // Increments the votes count of answer when the user votes
  handleVote = voteAnswer => {
    const { pollAnswers } = this.state
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })
    this.setState({
      pollAnswers: [...newPollAnswers]
    })
  }

  render() {
    return (
      <div>
        <Poll question={this.state.pollQuestion} answers={this.state.pollAnswers} onVote={this.handleVote} />
      </div>
    )

  }
};
export default Vote 