import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <ul>
        <button onClick={() => window.location.reload()}><Link to='/home'>Home</Link></button>
      </ul>
    </div>
  )
}
export default NavBar;