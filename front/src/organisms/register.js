import React from 'react'
import { Grid, Form, Segment, Message } from 'semantic-ui-react'
import Button from '../atoms/button'
import InputFormType from '../atoms/inputForm'
import HeaderForm from '../molecules/headerForm'

const RegisterForm = () =>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <HeaderForm asHeader='h2' colorHeader='teal' textAlignHeader='center' srcImage='/logo192.png' contentHeader='Register in your'/>
      <Form size='large'>
        <Segment stacked>
          <InputFormType icon='at' iconPosition='left' placeholder='your email' type='email'/>
          <InputFormType icon='user' iconPosition='left' placeholder='your lastname' type='text'/>
          <InputFormType icon='user' iconPosition='left' placeholder='your firstname' type='text'/>
          <InputFormType icon='lock' iconPosition='left' placeholder='password' type='password'/>
          <InputFormType icon='lock' iconPosition='left' placeholder='Confirm your password' type='password'/>
          <Button content='Register' color='teal' fluid size='large'></Button>
        </Segment>
      </Form>
      <Message>
        Already an account ? <a href='/login'>Sign in</a>
      </Message>
    </Grid.Column>
  </Grid>

  export default RegisterForm