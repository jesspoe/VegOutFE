import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


class NavbarPage extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
    
<Navbar sticky="top" bg="light" variant="light">
<Navbar.Brand href="/">VegOut!</Navbar.Brand>
<Nav className="mr-auto">
  <Nav.Link href="/">Home</Nav.Link>
  <Nav.Link href="/groups">Groups</Nav.Link>
  <Nav.Link href="/resources">Resources</Nav.Link>
</Nav>
<Nav.Link href="/logout">Logout</Nav.Link>
</Navbar>
    );
  }
}

export default NavbarPage;


