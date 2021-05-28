import React, {useState} from 'react'
import { Grid, Segment, Header, Icon } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'
import useReservations from '../../../context/reservation'
import Review from './../../review'

export default function PastReservations(){
    const reservationsContext = useReservations()
    const rentalsContext = useRentals()
    const userContext = useUser()
    const today_date = new Date()
    const myReservations = reservationsContext.getMyReservations(userContext.user.id)
    var noAds =""

    function parseDate(str) {
        var datesplit = str.slice(0, 10);
        var mdy = datesplit.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }

    if(!myReservations.find(reserv => parseDate(reserv.end).getTime() <= today_date.getTime()))
        noAds = "No ads here"
    else
        noAds=""

    return(
        <div>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h3'><i class="hourglass end icon"></i> PAST</Header>
                {myReservations.map((reserv, ind)=>(
                    (parseDate(reserv.end).getTime() < today_date.getTime() || reserv.status ==="CANCELLED"
                    && rentalsContext.allRentals ) &&
                    <Grid.Column>
                        <Segment>
                            <Grid >
                                <Grid.Row >
                                    <Grid.Column width={5}> 
                                        <Header as='h4'>{rentalsContext.getRentalById(reserv.rental_id).title}</Header>
                                        {rentalsContext.getRentalById(reserv.rental_id).address}
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        STATUS : <br/>
                                        {reserv.status}
                                    </Grid.Column>
                                    <Grid.Column width={3} >
                                    {
                                        reserv.client_review === null && reserv.status ==="CANCELLED"?
                                        "" :
                                        reserv.client_review === null && reserv.status !=="CANCELLED"?
                                        <Header floated='right'><Review/> </Header> : 
                                        <Header floated='right'> {reserv.client_review} </Header>
                                    }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
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