import React from 'react'
import { Grid, Segment, Rating } from 'semantic-ui-react'
import useUser from '../../context/user'

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