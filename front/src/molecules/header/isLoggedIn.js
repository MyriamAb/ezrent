import React from 'react'
import {Container, Dropdown, Image, Menu} from 'semantic-ui-react'
import useUser from '../../../src/context/user'

export default function IsLoggedIn() {
    const userContext = useUser()

  return (
    <Menu  inverted stackable style={{ margin: 0 }}>
        <Container fluid>
          <Menu.Item as='a' href='/' header>
            <Image size='tiny' src='/logo_white2.png' circular />
          </Menu.Item>
          <Menu.Item as='a' position='right'>
            <Dropdown item simple text='Profile'>
                <Dropdown.Menu>
                    <Dropdown.Item as ="a" href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>My ads</Dropdown.Item>
                    <Dropdown.Item>My booking</Dropdown.Item>
                    <Dropdown.Item onClick={userContext.logout}> Logout </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </Menu.Item>
        </Container>
    </Menu>
  )
}