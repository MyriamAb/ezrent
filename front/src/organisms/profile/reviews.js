import React, {useEffect, useState} from 'react'
import { Grid, Form, Segment, Message, Icon, Image, Rating } from 'semantic-ui-react'
import Button from '../../atoms/button'
import InputFormType from '../../atoms/inputForm'
import HeaderForm from '../../molecules/headerForm'
import useUser from '../../context/user'
import ButtonImage from '../../atoms/buttonImage'

export default function Reviews(){
    const userContext = useUser()

    return(
        <Grid container columns={1} stackable>
          {userContext.userReviews != null && userContext.allUsers != null ? userContext.userReviews.map((rev, ind)=>(
                <Grid.Column>
                    <Segment key={ind}> 
                        {userContext.getUserbyId(rev.reviewer_id)["name"]} <br/>
                        <Rating icon='star' defaultRating={rev.grade} maxRating={5} /> <br/>
                        Posted on {rev.created_at.slice(0, 10)}<br/><br/>
                        {rev.comment}
                    </Segment>
                </Grid.Column>
          )) : <span></span> }
      </Grid> 
   )
}