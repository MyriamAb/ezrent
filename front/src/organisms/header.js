import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react'

function Header() {

  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='tiny' src='/logo_white2.png' style={{ marginRight: '1.5em' }} circular/>
            E.Z Rent
          </Menu.Item>
          <Menu.Item as='a'>Home</Menu.Item>
          <Menu.Item as='a' href='/register'>Register</Menu.Item>
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
    </div>
  )
}
  

    export default Header