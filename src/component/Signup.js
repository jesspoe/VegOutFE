import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
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
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('jwt', json.jwt);
        this.props.setUserId(json.user.id)
      })
      .catch(function (error) { console.log(" There is an error: ", error.message) })
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
                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">VegOut!</MDBCardTitle>
                    <p className="mx-5 mb-5">A place to find vegan-friendly restaurants with the ability to collobrate and vote on your favorites with friends and family!
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
                          <form onChange={(event) => this.handleChange(event)} className="needs-validation">
                            <p className="h4 text-center mb-4">Sign up</p>
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                              First Name
</label>
                            <input
                              type="text"
                              id="defaultFormRegisterNameEx"
                              className="form-control"
                              name='first_name' />
                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                              Last Name
</label>
                            <input
                              type="text"
                              id="defaultFormRegisterNameEx"
                              className="form-control"
                              name='last_name'

                            />

                            <br />
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                              Username
</label>
                            <input
                              type="text"
                              id="defaultFormRegisterNameEx"
                              className="form-control"
                              name='username'

                            />

                            <br />
                            <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                              Email
</label>
                            <input
                              type="email"
                              id="defaultFormRegisterEmailEx"
                              className="form-control"
                              name='email'

                            />

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

                            />

                            <div className="text-center mt-4">
                              <MDBBtn onClick={(event) => this.handleSubmit(event)} color='green' type="submit">Register</MDBBtn>
                            </div>
                            <br />
                            <p className="font-small green-text d-flex justify-content-center">
                              Have an account? </p><Link to='/login' className="font-small d-flex justify-content-center">Login </Link>

                          </form>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="3">
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

export default Signup;





