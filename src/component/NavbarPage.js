import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav'
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
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
<Navbar.Brand href="#home">VegOut!</Navbar.Brand>
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



{/* <div>
<MDBNavbar color="white" expand="md">
  <MDBNavbarBrand>
    <strong className="black-text">VegOut!</strong>
  </MDBNavbarBrand>
  <MDBNavbarToggler onClick={this.toggleCollapse} />
  <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
    <MDBNavbarNav left>
      <MDBNavItem >
        <Nav.Link className="black-text" href="/">Home</Nav.Link>
      </MDBNavItem>
      <MDBNavItem >
        <Nav.Link className="black-text" href="/groups">Groups</Nav.Link>
      </MDBNavItem>
      <MDBNavItem>
        <Nav.Link className="black-text" href="/resources">Resources</Nav.Link>
      </MDBNavItem>
    </MDBNavbarNav>
    <MDBNavbarNav right>
      <MDBNavItem>
        <MDBDropdown>
          <MDBDropdownToggle nav caret>
            <span className="black-text" >More</span>
          </MDBDropdownToggle>
          <MDBDropdownMenu className="dropdown-default" right>
            <MDBDropdownItem href="/logout">Log Out</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    </MDBNavbarNav>
  </MDBCollapse>
</MDBNavbar>
</div> */}