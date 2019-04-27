import React, { Component } from 'react';


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
      <div>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>

          <label htmlFor='name'>First Name</label><br />
          <input type='first_name' name='first_name' id='first_name' /><br />

          <label htmlFor='name'>Last Name</label><br />
          <input type='last_name' name='last_name' id='last_name' /><br />

          <label htmlFor='username'>Username</label><br />
          <input type='username' name='username' id='username' /><br />

          <label htmlFor='email'>Email</label><br />
          <input type='email' name='email' id='email' /><br />

          <label htmlFor='password'>Password</label><br />
          <input type='password' name='password' id='password' /><br />

          <input type='submit' value="Sign Up!" />

        </form>
        <div>
          <h2>Already Using VegOut?</h2>
          <button onClick={() => this.props.history.push('/login')}>Log-In</button>
        </div>

      </div>
    );
  }
}

export default Signup;