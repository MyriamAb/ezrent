import React, {useEffect, useState} from 'react'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'
import useReservations from '../../../context/reservation'

export default function PastAds(){
    const reservationsContext = useReservations()
    const rentalsContext = useRentals()
    const userContext = useUser()
    const today_date = new Date()
    const [myRentals, setMyRentals] = useState(rentalsContext.getMyRentals(userContext.user.id))

    function parseDate(str) {
        var datesplit = str.slice(0, 10);
        var mdy = datesplit.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }

    return(
        <div>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h2'>PAST</Header>
                {myRentals.map((rent, ind)=>(
                    (parseDate(rent.end).getTime() <= today_date.getTime()) && 
                    <Grid.Column> 
                        <Segment key={ind}> 
                            <Header as='h3'>{rent.title}</Header>
                            {rent.address}
                        </Segment> 
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    )
}