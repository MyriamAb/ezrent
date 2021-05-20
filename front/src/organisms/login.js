import React from 'react'
import { Grid, Form, Segment, Message, Icon } from 'semantic-ui-react'
import Button from '../atoms/button'
import InputFormType from '../atoms/inputForm'
import HeaderForm from '../molecules/headerForm'

const LoginForm = () =>
<div style={{backgroundImage: `url("https://www.lodgify.com/blog/wp-content/uploads/2019/12/far-away.jpg.webp")`, backgroundSize:'cover'}}>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <HeaderForm asHeader='h1' colorHeader='black' textAlignHeader='center' srcImage='/logo_grey2.png' contentHeader='Log-in to your account'/>
      <Form size='large'>
        <Segment stacked style={{ backgroundColor: 'rgba(117, 190, 218, 0.5)' }}>
          <InputFormType icon='user' iconPosition='left' placeholder='your Email' type='email'/>
          <InputFormType icon='lock' iconPosition='left' placeholder='Password' type='password'/>
          <Button content='Login' color='black' size='large' fluid='true'></Button>
        </Segment>
      </Form>
      <Message attached='bottom' floating compact>
      <Icon name='help' />
      New to us? <a href='/register'> Register You</a>
      </Message>
      <Message attached='bottom' floating compact>
      <Icon name='warning' />
        <a href='/password'>Forget your Password ?</a>
      </Message>
    </Grid.Column>
  </Grid>
</div>

  export default LoginForm