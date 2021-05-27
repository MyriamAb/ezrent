import React, {useEffect, useState} from 'react'
import { Form, Image, Grid } from 'semantic-ui-react'
import Button from '../../atoms/button'
import InputFormType from '../../atoms/inputForm'
import useUser from '../../context/user'
import ButtonImage from '../../atoms/buttonImage'
import Reviews from './reviews'

export default function PersonnalInfo(){
    const userContext = useUser()
    const [data, setData]= useState({
        email : "",
        name: "",
        phone:"",
        profile_picture: "",
        password:"",
        password_confirm: "",
      })
    const [profilePic, setProfilePic] = useState("");

    useEffect(()=>{
      if(!userContext.userProfile[0])
        return
      setData({
        email : userContext.userProfile[0].email,
        name: userContext.userProfile[0].name,
        phone : userContext.userProfile[0].phone,
        profile_picture: new Buffer.from(userContext.userProfile[0].profile_picture.data,'base64').toString(),
        password:"",
        password_confirm: "",
      })
    }, [userContext.userProfile])

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
        userContext.editProfile(data, profilePic)
        setProfilePic("")           
    }
  
    function fileUploadInputChange(e) {
      e.preventDefault()
      let reader = new FileReader();
      reader.onload = function(e) {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    return(
      <div>
        <Grid columns={1}>
        <Grid.Column  width={2}></Grid.Column>
          <Grid.Column  width={12}>
            <Form onSubmit={(e)=>submit(e)} size='large'>
                <Image src={data.profile_picture} size='tiny' centered circular/> <br/>
                <ButtonImage onChange={e => fileUploadInputChange(e)} /><br/>
                <InputFormType icon='user' placeholder='name'  type='text' id='name'  onChange={(e)=>handle(e)} value={data.name} />
                <InputFormType icon='user' placeholder='email' type='text' id='email' onChange={(e)=>handle(e)} value={data.email} />
                <InputFormType icon='user' placeholder='phone' type='text' id='phone' onChange={(e)=>handle(e)} value={data.phone} />
                <InputFormType icon='lock' placeholder='Password' type='password' id='password'  onChange={(e)=>handle(e)} />
                <InputFormType icon='lock' placeholder='Confirm your password' type='password' id='password_confirm' onChange={(e)=>handle(e)} onKeyUp={(e)=>checkpassword(e)}/>
                <span id='message'></span>
                <Button content='Edit' color='black' size='large' fluid='true'></Button>
            </Form>
          </Grid.Column>
          <Grid.Column  width={2}></Grid.Column>
        </Grid>
        <h2 class="ui center aligned icon header">REVIEWS</h2>
        <Reviews/>
      </div>
    )
}