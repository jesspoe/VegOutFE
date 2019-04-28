import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
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
    })
      .then(res => res.json())
      .then(res => window.localStorage.setItem('jwt', res.jwt))
      .then(() => this.props.history.push('/'))
      .catch(function (error) { console.log(" There is an error: ", error.message) })
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <MDBJumbotron style={{ padding: 0 }}>
                <MDBCol className="text-white text-center py-5 px-4 my-5" style={{ backgroundImage: `url(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)` }}>
                  <MDBCol className="py-5">
                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Welcome to VegOut!</MDBCardTitle>
                    <p className="mx-5 mb-5">A place to find vegan-friendly restaurants and collobrate with your friends and family!
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
                          <form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleChange(event)}>
                            <p className="h4 text-center mb-4">Sign in</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                              Email
                            </label>
                            <input
                              type="email"
                              id="defaultFormLoginEmailEx"
                              className="form-control"
                              name="email"
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
                            />
                            <div className="text-center mt-4">
                              <MDBBtn gradient="peach" type="submit">Login</MDBBtn>
                            </div>
                            <p className="font-small grey-text d-flex justify-content-center">
                              Need an account?
                    <a onClick={() => this.props.history.push('/signup')} className="blue-text ml-1">

                                Sign Up
                    </a>
                            </p>
                          </form>

                        </MDBCardBody>
                      </MDBCard>

                    </MDBCol>
                    <MDBCol sm="3">
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>

    );
  }
}

export default Login;