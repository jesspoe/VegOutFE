import React, { Component } from 'react';

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
      .then(() => this.props.history.push('/home'))
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
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

          <label htmlFor='email'>Email</label><br />
          <input type='email' name='email' id='email' /><br />

          <label htmlFor='password'>Password</label><br />
          <input type='password' name='password' id='password' /><br />

          <input type='submit' value="Log In" />

        </form>
      </div>
    );
  }
}

export default Login;