import React from 'react'
import {Container, Dropdown, Image, Menu} from 'semantic-ui-react'

export default function IsLoggedOut() {

  return (
      <Menu  inverted stackable style={{ margin: 0 }}>
        <Container fluid>
          <Menu.Item as='a' href='/' header>
            <Image size='tiny' src='/logo_white2.png' circular />
          </Menu.Item>
          <Menu.Item as='a' href='/register' position='right'>Register</Menu.Item>
          <Menu.Item as='a' href="/login">Login</Menu.Item>
        </Container>
          </Menu>
  
  )
}