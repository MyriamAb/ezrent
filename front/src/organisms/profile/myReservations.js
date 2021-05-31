import React, { useState} from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import useUser from '../../context/user'
import useReservations from '../../context/reservation'
import useRentals from '../../context/rentals'
import Review from './../review'

export default function MyReservations() {
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
                <Header as='h3'><i class="hourglass half icon"></i> IN PROCESS</Header>
                {myReservations.map((reserv, ind)=>(
                    (parseDate(reserv.end).getTime() > today_date.getTime()) && rentalsContext.allRentals &&
                    <Grid.Column> 
                        <Segment key={ind}> 
                            <Header as='h4'>{rentalsContext.getRentalById(reserv.rental_id).title}</Header>
                            {rentalsContext.getRentalById(reserv.rental_id).address}
                        </Segment>
                        </Grid.Column> 
                    ))}
            </Grid>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h3'><i class="hourglass end icon"></i> PAST</Header>
                {myReservations.map((reserv, ind)=>(
                    (parseDate(reserv.end).getTime() <= today_date.getTime()) && rentalsContext.allRentals &&
                    <Grid.Column>
                        <Segment.Group horizontal> 
                            <Segment key={ind}> 
                                <Header as='h4'>{rentalsContext.getRentalById(reserv.rental_id).title}</Header>
                                {rentalsContext.getRentalById(reserv.rental_id).address}
                            </Segment> 
                            <Segment key={ind}>
                                {
                                    reserv.client_review === null ?
                                        <Header floated='right'><Review id={reserv.id} isClient={true} reviewer_id={reserv.client_id} reviewed_id={reserv.owner_id}/> </Header> :
                                    <Header floated='right'> {reserv.client_review} </Header>
                                }
                            </Segment>
                        </Segment.Group>
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