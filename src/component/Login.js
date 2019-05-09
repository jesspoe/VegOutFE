import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import { Link } from 'react-router-dom'
import toaster from 'toasted-notes';


class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
  }



  handleFormReset = () => {
    this.setState({
      email: "",
      password: ""
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response;
    }).then(response => response.json())
      .then(json => {
        localStorage.setItem('jwt', json.jwt)
        this.props.setUserId(json.user.id)
      })
      // .catch(function (error) { console.log(" There is an error: ", error.message) })
      .catch(err => {
        toaster.notify('Invalid Login, Please try again', {
          duration: 1000
        })
        this.handleFormReset()
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return (
      <div className="opening-pages">
        <div className="container" id='overall'>
          <MDBRow>
            <MDBCol>
              <div className="jumbotron" >
                <MDBCol className="jumbotext">
                  <MDBCol className="py-5">
                    <h1 className="h1-responsive  m-5 font-bold">VegOut!</h1>
                    <p className="mx-5 mb-5">A place to find vegan-friendly restaurants with the ability to collobrate and vote on your favorites with friends and family!
                  </p>
                  </MDBCol>
                </MDBCol>
                <MDBContainer className="sign-up">
                  <MDBRow>
                    <MDBCol sm="3">
                    </MDBCol>
                    <MDBCol sm="6">


                      <MDBCard>
                        <MDBCardBody>

                          <form >
                            <p className="h4 text-center mb-4">Sign in</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                              Email
                              </label>
                            <input
                              type="email"
                              id="defaultFormLoginEmailEx"
                              className="form-control"
                              name="email"
                              value={this.state.email}
                              onChange={(event) => this.handleChange(event)}
                            />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                              Password
                              </label>
                            <input
                              type="password"
                              id="defaultFormLoginPasswordEx"
                              className="form-control"
                              name="password"
                              value={this.state.password}
                              onChange={(event) => this.handleChange(event)}
                            />
                            <div className="text-center mt-4">
                              <MDBBtn color="green" type="submit" onClick={(event) => this.handleSubmit(event)}>Login</MDBBtn>
                            </div>
                            <br />
                            <p className="font-small green-text d-flex justify-content-center">
                              Need an account? </p>  <Link to='/signup' className="font-small d-flex justify-content-center"> Signup </Link>

                          </form>
                        </MDBCardBody>
                      </MDBCard>

                    </MDBCol>
                    <MDBCol sm="3">
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </div>
            </MDBCol>
          </MDBRow>
        </div >

      </div>
    );
  }
}

export default Login;