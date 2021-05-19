import React from 'react'
import { Grid, Form, Segment, Message, Icon } from 'semantic-ui-react'
import Button from '../atoms/button'
import InputFormType from '../atoms/inputForm'
import HeaderForm from '../molecules/headerForm'

const RegisterForm = () =>
<div style={{backgroundImage: `url("https://www.lodgify.com/blog/wp-content/uploads/2019/12/far-away.jpg.webp")`, backgroundSize:'cover'}}>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <HeaderForm asHeader='h1' colorHeader='black' textAlignHeader='center' srcImage='/logo_grey2.png' contentHeader='Register you'/>
      <Form size='large'>
        <Segment stacked style={{ backgroundColor: 'rgba(117, 190, 218, 0.5)' }}>
          <InputFormType icon='at' iconPosition='left' placeholder='Email' type='email'/>
          <InputFormType icon='user' iconPosition='left' placeholder='Last Name' type='text'/>
          <InputFormType icon='user' iconPosition='left' placeholder='First Name' type='text'/>
          <InputFormType icon='lock' iconPosition='left' placeholder='Password' type='password'/>
          <InputFormType icon='lock' iconPosition='left' placeholder='Confirm your password' type='password'/>
          <Button content='Register' color='black' size='large' fluid='true'></Button>
        </Segment>
      </Form>
      <Message attached='bottom' warning>
      <Icon name='help' />
      Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
    </Message>
    </Grid.Column>
  </Grid>
</div>

  export default RegisterForm