import React, { useState } from 'react'
import { Grid, Form, Segment, Message, Icon } from 'semantic-ui-react'
import Button from '../atoms/button'
import InputFormType from '../atoms/inputForm'
import HeaderForm from '../molecules/headerForm'
import useUser from '../context/user'

function LoginForm() {
  const userContext = useUser()
  const [data, setData]= useState({
    email:"",
    password:"",
  })

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }


  function submit(e){
    e.preventDefault()
    userContext.login(data)           
  }

return(
  <div style={{backgroundImage: `url("https://www.lodgify.com/blog/wp-content/uploads/2019/12/far-away.jpg.webp")`, backgroundSize:'cover'}}>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <HeaderForm asHeader='h1' colorHeader='black' textAlignHeader='center' srcImage='/logo_grey2.png' contentHeader='Log-in to your account'/>
        <Form onSubmit={(e)=>submit(e)} size='large'>
          <Segment stacked style={{ backgroundColor: 'rgba(117, 190, 218, 0.5)' }}>
            <InputFormType icon='user' iconPosition='left' placeholder='your Email' type='email' id='email' onChange={(e)=>handle(e)}/>
            <InputFormType icon='lock' iconPosition='left' placeholder='Password' type='password' id='password' onChange={(e)=>handle(e)}/>
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
  )
}

  export default LoginForm