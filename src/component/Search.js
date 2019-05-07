import React, { Component } from 'react';
import { MDBCol, MDBIcon, MDBRow } from "mdbreact";


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

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.searchResults(this.state)
  }

  render() {
    if (this.props.restaurants[0]) {
      return (
        <div>
          <MDBRow className="search">
            <MDBCol md="5">
              <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                <div className="input-group md-form form-sm form-1 pl-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text teal" id="basic-text1">
                      <MDBIcon className="text-white" icon="search" />
                    </span>
                  </div>
                  <input className="form-control my-0 py-1" name="search" type="text" placeholder="Search by Postal Code" aria-label="Search" />
                </div>
              </form>
            </MDBCol>
          </MDBRow>
          <div className="search-text">Restaurants in {this.props.restaurants[0].city}</div>
        </div>
      )
    } { return null }
  }
}

export default Search;


