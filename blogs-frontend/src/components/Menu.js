import React from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {

  const linkPadding = {
    paddingRight: 30,
    color: 'white'
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' className='navigation'>
      <Nav>
        <Nav.Link href='#' as='span'>
          <Link style={linkPadding} to="/">blogs</Link>
        </Nav.Link>
        <Nav.Link href='#' as='span'>
          <Link style={linkPadding} to="/users">users</Link>
        </Nav.Link>
      </Nav>
      <span className='userInfo'>{user.name} logged in <Button onClick={handleLogout}>logout</Button></span>
    </Navbar>
  )
}

export default Menu