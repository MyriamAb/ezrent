import React from 'react'
import { Grid, Form, Segment, Message } from 'semantic-ui-react'
import Button from '../atoms/button'
import InputFormType from '../atoms/inputForm'
import HeaderForm from '../molecules/headerForm'

const LoginForm = () =>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <HeaderForm asHeader='h2' colorHeader='teal' textAlignHeader='center' srcImage='/logo192.png' contentHeader='Log-in to your account'/>
      <Form size='large'>
        <Segment stacked>
          <InputFormType icon='user' iconPosition='left' placeholder='your Email' type='email'/>
          <InputFormType icon='lock' iconPosition='left' placeholder='Password' type='password'/>
          <Button content='Login' color='teal' fluid size='large'></Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/register'>Register You</a>
      </Message>
      <Message>
        <a href='/password'>Forget your Password ?</a>
      </Message>
    </Grid.Column>
  </Grid>

  export default LoginForm