import React, { useEffect, useState } from 'react'
import { useParams } from "react-router"
import { Form, Image, Grid, Text, Item, Container} from 'semantic-ui-react'
import Button from '../../../atoms/button'
import InputFormType from '../../../atoms/inputForm'
import useUser from '../../../context/user'
import ButtonImage from '../../../atoms/buttonImage'
import Reviews_Public from './reviews_public'

export default function User(){
  const userContext = useUser()
    const { id } = useParams()
    const [data, setData]= useState({
        email : "",
        name: "",
        phone:"",
        profile_picture: "",
      })
    const [profilePic, setProfilePic] = useState("");
    const [message, setMessage] = useState({ editProfileOK: "" })
    
    useEffect(()=>{
      if (!userContext.allUsers) {
            return
      }
      var user = userContext.allUsers.find(el => el.id == id)
      console.log(user)
        setData({
            email : user.email,
            name: user.name,
            phone : user?.phone,
            profile_picture: user.profile_picture === null ||  user.profile_picture === undefined ? 
                            "/profileDefaultPic.jpeg":
                            typeof(user.profile_picture) === 'string' ?
                            user.profile_picture :
                            new Buffer.from(user.profile_picture.data,'base64').toString(),
        })
       }, [userContext.allUsers, id])
    return(
      <div>
        <Grid columns={1}>
        <Grid.Column  width={2}></Grid.Column>
          <Grid.Column  width={12}>
            <Image src={data.profile_picture} size='small' centered circular/> <br/>
            <Image src={profilePic} size='tiny' /> <br />
            <Grid.Row>
              <Item.Header as='h4'>Name</Item.Header>
              <p>{data.name}</p>
            </Grid.Row>
            <Grid.Row>
              <Item.Header as='h4'>Email</Item.Header>
              <p>{data.email}</p>
            </Grid.Row>
            <Grid.Row>
              <Item.Header as='h4'>Phone</Item.Header>
              <p>{data.phone}</p>
            </Grid.Row>
            </Grid.Column>
          <Grid.Column  width={2}></Grid.Column>
        </Grid>
        <h2 class="ui center aligned icon header">REVIEWS</h2>
        <Reviews_Public id={id}/>
      </div>
    )
}