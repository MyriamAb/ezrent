import React, {useState} from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'

export default function PastAds(){
    const rentalsContext = useRentals()
    const userContext = useUser()
    const today_date = new Date()
    const myRentals = rentalsContext.getMyRentals(userContext.user.id)
    var noAds =""

    function parseDate(str) {
        var datesplit = str.slice(0, 10);
        var mdy = datesplit.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }

    if(!myRentals.find(rent => (parseDate(rent.end).getTime() <= today_date.getTime() )))
        noAds = "No ads here"
    else
        noAds=""

    return(
        <div>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h2'> <i class="hourglass end icon"></i> PAST</Header>
                {myRentals.map((rent, ind)=>(
                    (parseDate(rent.end).getTime() < today_date.getTime()) && 
                    <Grid.Column> 
                        <Segment key={ind}> 
                            <Header as='h3'>{rent.title}</Header>
                            {rent.address}
                        </Segment> 
                    </Grid.Column>
                ))}
                 <Grid.Column> 
                    {noAds}
                    <br/>
                </Grid.Column>
            </Grid>
        </div>
    )
}