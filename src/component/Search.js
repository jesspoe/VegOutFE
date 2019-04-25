import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      search: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.searchResults(this.state)
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
          <input type='text' name='search' id='search' placeholder='search by city' />
          <input type='submit' value="Search" />
        </form>
      </div>
    );
  }
}

export default Search;
