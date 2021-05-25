import React, {useEffect, useState} from 'react'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'
import useReservations from '../../../context/reservation'
import ConfirmClient from './confirmClient'

export default function InProcessAds(){
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
                <Header as='h2'>IN PROCESS</Header>
                {myRentals.map((rent, ind)=>(
                    (parseDate(rent.end).getTime() > today_date.getTime()) && 
                    <Grid.Column> 
                            <Segment key={ind}> 
                                <Header as='h3'>{rent.title}</Header>
                                {rent.address}
                                <Header as='h4'>REQUESTS ON THIS AD : </Header>
                                {reservationsContext.getReservationsByRental(rent.id).map(reservation => 
                                    <Segment.Group horizontal>
                                        <Segment> 
                                            {userContext.getUserbyId(reservation.client_id)["name"]} <br/>
                                            {` From : ${reservation.start.slice(0, 10)}`} <br/>
                                            {`To : ${reservation.end.slice(0, 10)} `}
                                        
                                        </Segment>
                                        <Segment>
                                            STATUS : <br/>
                                            {reservation.status}
                                        </Segment>
                                        <Segment>
                                            <Button.Group>
                                                <ConfirmClient clientName={userContext.getUserbyId(reservation.client_id)["name"]}/>
                                                <Button.Or />
                                                <Button negative>Refuse</Button>
                                            </Button.Group>
                                        </Segment>
                                    </Segment.Group>
                                    )}
                            </Segment>
                    </Grid.Column> 
                    ))}
            </Grid>
        </div>
    )
}