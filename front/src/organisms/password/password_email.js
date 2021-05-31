import React, { useState } from 'react'
import { useParams } from "react-router"
import { Grid, Form, Segment, Message, Icon } from 'semantic-ui-react'
import Button from '../../atoms/button'
import InputFormType from '../../atoms/inputForm'
import HeaderForm from '../../molecules/headerForm'
import useUser from '../../context/user'

function PasswordResetForm(){
    const userContext = useUser()
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [data, setData]= useState({
    email: ""
    })
  var message = null;

  function handle(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }
    
  function handleDismiss(e) {
    setVisible(false);
  }

    function submit(e){
      e.preventDefault();
      setVisible(true);
      userContext.sendResetEmail(data.email);
    }
  
  if (visible == true) {
    message = <Message
                  positive
                  attached
                  onDismiss={handleDismiss}
                  header='An email has been sent'
                  content='Please, check your mailbox to reset your password.'
              />
  }

  return(
    <div style={{ backgroundImage: `url("https://www.lodgify.com/blog/wp-content/uploads/2019/12/far-away.jpg.webp")`, backgroundSize: 'cover' }}>      
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <HeaderForm asHeader='h1' colorHeader='black' textAlignHeader='center' srcImage='/logo_grey2.png' contentHeader='Reset your password'/>
          {message}
          <Form onSubmit={(e)=>submit(e)} size='large'>
            <Segment stacked style={{ backgroundColor: 'rgba(117, 190, 218, 0.5)' }}>
              <InputFormType icon='at'   placeholder='Email'                 type='email'    id='email'     onChange={(e)=>handle(e)} />
              <span id='message'></span>
              <Button content='Send reset password email' color='black' size='large' fluid='true'></Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
  </div>
  )

}
export default PasswordResetForm