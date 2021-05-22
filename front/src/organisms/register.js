import React, { useState } from 'react'
import { Grid, Form, Segment, Message, Icon } from 'semantic-ui-react'
import Button from '../atoms/button'
import InputFormType from '../atoms/inputForm'
import HeaderForm from '../molecules/headerForm'
import useUser from '../context/user'

function RegisterForm(){
  const userContext = useUser()
  const [data, setData]= useState({
    email:"",
    lastname:"",
    firstname:"",
    password:"",
    password_confirm: "",
  })

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  function checkpassword(e){
    if(data.password === data.password_confirm ){
      document.getElementById('message').innerHTML = ''
      document.getElementById('password_confirm').style.color = 'black';
    }else{
      document.getElementById('message').style.color = 'red';
      document.getElementById('password_confirm').style.color = 'red';
      document.getElementById('message').innerHTML = 'Passwords do not match!';
    }
  }

  function submit(e){
    e.preventDefault()
    if(data.password === data.password_confirm )
      userContext.register(data)           
  }

  return(
    <div style={{backgroundImage: `url("https://www.lodgify.com/blog/wp-content/uploads/2019/12/far-away.jpg.webp")`, backgroundSize:'cover'}}>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <HeaderForm asHeader='h1' colorHeader='black' textAlignHeader='center' srcImage='/logo_grey2.png' contentHeader='Register'/>
          <Form onSubmit={(e)=>submit(e)} size='large'>
            <Segment stacked style={{ backgroundColor: 'rgba(117, 190, 218, 0.5)' }}>
              <InputFormType icon='user' placeholder='Last Name'             type='text'     id='lastname'  onChange={(e)=>handle(e)} />
              <InputFormType icon='user' placeholder='First Name'            type='text'     id='firstname' onChange={(e)=>handle(e)} />
              <InputFormType icon='at'   placeholder='Email'                 type='email'    id='email'     onChange={(e)=>handle(e)} />
              <InputFormType icon='lock' placeholder='Password'              type='password' id='password'  onChange={(e)=>handle(e)} />
              <InputFormType icon='lock' placeholder='Confirm your password' type='password' id='password_confirm' onChange={(e)=>handle(e)} onKeyUp={(e)=>checkpassword(e)}/>
              <span id='message'></span>
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
  )

}
export default RegisterForm