import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'

function Header() {

  return (
      <Menu  inverted stackable style={{ margin: 0 }}>
        <Container fluid>
          <Menu.Item as='a' href='/' header>
            <Image size='tiny' src='/logo_white2.png' circular />
          </Menu.Item>
          <Menu.Item as='a' href='/register' position='right'>Register</Menu.Item>
          <Menu.Item as='a' href="/login">Login</Menu.Item>
          <Dropdown item simple text='Profile'>
            <Dropdown.Menu>
              <Dropdown.Item as ="a" href="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>My ads</Dropdown.Item>
              <Dropdown.Item>My booking</Dropdown.Item>
              <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
          </Menu>
  
  )
}
  

    export default Header