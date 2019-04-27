import React from 'react';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const NavBar = () => {
  return (

    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/groups">Groups</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
export default NavBar;
