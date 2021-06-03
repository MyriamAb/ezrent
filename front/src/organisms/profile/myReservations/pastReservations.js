import React, {useState} from 'react'
import { Grid, Segment, Header, Icon, Button } from 'semantic-ui-react'
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

    function deleteReservation(e, id){
        e.preventDefault()
        reservationsContext.deleteReservation(id)
    }

    if(!myReservations.find(reserv => parseDate(reserv.end).getTime() <= today_date.getTime())){
        noAds = <Grid.Column>
                    <Header as='h1' centered> You have no past reservations </Header>
                </Grid.Column>
    }else
        noAds=""

    return(
        <div>
            <Grid container columns={1} stackable>
                {myReservations.map((reserv, ind)=>(
                    (parseDate(reserv.end).getTime() < today_date.getTime() || reserv.status ==="CANCELLED"
                    && rentalsContext.allRentals ) ?
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
                                        reserv.client_review === false && reserv.status ==="CANCELLED"?
                                        "" :
                                        reserv.client_review === false && reserv.status !=="CANCELLED"?
                                        <Header floated='right'><Review id={reserv.id} isClient={true} reviewer_id={reserv.client_id} reviewed_id={reserv.owner_id}/> </Header> : 
                                        <Header floated='right'> Reviewed </Header>
                                    }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column> : 
                    reserv.status ==="UNAVAILABLE" ?
                    <Grid.Column>
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                <Grid.Column width={12} >
                                    {`You tried to book from  ${reserv.start.slice(0,10)}
                                     to  ${reserv.end.slice(0,10)}
                                    but the owner cancelled his ad`}.
                                </Grid.Column>
                                <Grid.Column width={4} >
                                    <Button onClick={(e)=>deleteReservation(e, reserv.id)}>Delete</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column> : ""
                ))}
                <Grid.Column> 
                    {noAds}
                    <br/>
                </Grid.Column>
            </Grid>
        </div>
    )
}