import React, {useEffect, useState} from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import useRentals from '../../context/rentals'
import useUser from '../../context/user'

export default function MyAds(){
    const rentalsContext = useRentals()
    const userContext = useUser()
    const today_date = new Date()
    const [myRentals, setMyRentals] = useState(rentalsContext.getMyRentals(userContext.user.id))
    const pastRentals = []
    const inProcessRentals = []

    function parseDate(str) {
        var datesplit = str.slice(0, 10);
        var mdy = datesplit.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }

    return(
        <div>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h3'>IN PROCESS</Header>
                {myRentals.map((rent, ind)=>(
                    (parseDate(rent.end).getTime() > today_date.getTime()) && 
                    <Grid.Column> 
                        <Segment key={ind}> 
                            <Header as='h4'>{rent.title}</Header>
                            {rent.address}
                        </Segment>
                        </Grid.Column> 
                    ))}
            </Grid>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h3'>PAST</Header>
                {myRentals.map((rent, ind)=>(
                    (parseDate(rent.end).getTime() <= today_date.getTime()) && 
                    <Grid.Column> 
                        <Segment key={ind}> 
                            <Header as='h4'>{rent.title}</Header>
                            {rent.address}
                        </Segment> 
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}