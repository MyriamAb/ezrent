import React from 'react'
import { Grid, Segment, Rating, Item } from 'semantic-ui-react'
import useUser from '../../../context/user'

export default function Reviews_Public(props){
    const userContext = useUser()

    console.log(userContext.allReviews)
    return(
        <Grid container columns={1} stackable>
          {userContext.allReviews != null && userContext.allUsers != null && userContext.allReviews.find(el => el.reviewed_id == props.id ) ? userContext.allReviews.map((rev, ind)=>(
                (rev.reviewed_id == props.id) &&
                <Grid.Column>
                  <Segment key={ind}>
                      <Item>
                          <Item.Image circular size='mini' src="/profileDefaultPic.jpeg" />
                        </Item>
                      {/* {userContext.getUserbyId(rev.reviewer_id)["name"]} <br/> */}
                        <a href={"http://localhost:3000/user/" + rev.reviewer_id}>
                            {userContext.getUserbyId(rev.reviewer_id) &&
                            userContext.getUserbyId(rev.reviewer_id)["name"]}
                        </a> <br/>
                        <Rating icon='star' defaultRating={rev.grade} maxRating={5} /> <br/>
                        Posted on {rev.created_at.slice(0, 10)}<br/><br/>
                        {rev.comment}
                    </Segment>
                </Grid.Column>
          )) : <span></span> }
      </Grid> 
   )
}