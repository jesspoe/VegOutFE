import React, { Component } from 'react';


class Search extends Component {
  constructor() {
    super()
    this.state = {
      search: ""
    }
  }

  // getGeo = () => {
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address='${this.state.search}'&key=`)
  //     .then(response => response.json())
  //     .then(json => {
  //       console.log("search json", json)
  //       // this.setState({
  //       //   search: json
  //       // })
  //     })
  // }


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
          <input type='text' name='search' id='search' placeholder='search by postal code' />
          <input type='submit' value="Search" />
        </form>
      </div>
    );
  }
}

export default Search;


