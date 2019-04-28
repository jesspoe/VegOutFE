import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBIcon, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: ""
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    event.target.className += " was-validated"
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      })
    })
      .then(res => res.json()).then(res => window.localStorage.setItem('jwt', res.jwt))
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
                <MDBRow >
                  <MDBCol md="3">
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBCard>
                      <MDBCardBody>
                        <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="needs-validation" noValidate>
                          <p className="h4 text-center mb-4">Sign up</p>
                          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            First Name
            </label>
                          <input
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control"
                            type='first_name'
                            name='first_name'
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a name.
              </div>
                          <div className="valid-feedback">Looks good!</div>
                          <br />
                          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Last Name
            </label>
                          <input
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control"
                            type='last_name'
                            name='last_name'
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a name.
              </div>
                          <div className="valid-feedback">Looks good!</div>
                          <br />
                          <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                            Username
            </label>
                          <input
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control"
                            type='username'
                            name='username'
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a username.
              </div>
                          <div className="valid-feedback">Looks good!</div>
                          <br />
                          <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                            Email
            </label>
                          <input
                            type="email"
                            id="defaultFormRegisterEmailEx"
                            className="form-control"
                            type='email'
                            name='email'
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid email.
              </div>
                          <div className="valid-feedback">Looks good!</div>
                          <br />
                          <label
                            htmlFor="defaultFormRegisterPasswordEx"
                            className="grey-text"
                          >
                            Password
            </label>
                          <input
                            type="password"
                            id="defaultFormRegisterPasswordEx"
                            className="form-control"
                            name="password"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a password.
              </div>
                          <div className="valid-feedback">Looks good!</div>
                          <div className="text-center mt-4">
                            <MDBBtn onClick={() => this.handleSubmit} gradient="aqua" type="submit">
                              Register
              </MDBBtn>
                            <p className="font-small grey-text d-flex justify-content-center">
                              Have an account?
                    <a onClick={() => this.props.history.push('/login')} className="blue-text ml-1">

                                Log in
                    </a>
                            </p>
                          </div>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol md="3">
                  </MDBCol>
                </MDBRow>

              </MDBContainer>

            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>












    );
  }
}

export default Signup;





