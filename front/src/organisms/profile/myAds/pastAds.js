import React, {useState} from 'react'
import {Link} from "react-router-dom";
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'
import Review from '../../review'
import useReservations from '../../../context/reservation'

export default function PastAds(){
    const reservationsContext = useReservations()
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
    function getPrice(start, end, pricePerDay) {
        var duration = (Math.round((parseDate(end) - parseDate(start)) / (1000 * 60 * 60 * 24)) + 1);
        var price = duration * pricePerDay;
        return price;
    };
    
    console.log("test : ")
    console.log(
        !!myRentals.find(
            rent => (
                parseDate(rent.end).getTime() < today_date.getTime()  &&
                reservationsContext.getReservationsByRental(rent.id).find(
                    resa => parseDate(resa.end).getTime() < today_date.getTime()
                )
            )
        )
    )
    
    if(!!myRentals.find(rent => (parseDate(rent.end).getTime() < today_date.getTime())  ||
        reservationsContext.getReservationsByRental(rent.id).find(resa =>
        parseDate(resa.end).getTime() < today_date.getTime()))){
        noAds=""
    }else{
        noAds= <Grid.Column>
                    <Header as='h1' centered> You have no past ads</Header>
                </Grid.Column>
    }

    return(
        <div>
            <Grid container columns={1} stackable>
                {myRentals.map((rent, ind)=>(
                    ( (parseDate(rent.end).getTime() < today_date.getTime()) || 
                    !!reservationsContext.getReservationsByRental(rent.id).find(resa =>
                        parseDate(resa.end).getTime() < today_date.getTime())  ) ?
                    <Grid.Column> 
                        <Segment  inverted tertiary block attached='top'>
                            <Grid>
                                <Grid.Row >
                                    <Grid.Column width={11}>
                                        {rent.title}<br/>
                                        <i class="map marker icon"></i>{rent.address}
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        <Link to={"/myads/" + rent.id}>
                                            <Button>See and edit your ad</Button>   
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment attached>
                            <Header as='h4'>PAST REQUESTS ON THIS AD : </Header>
                            {reservationsContext.getReservationsByRental(rent.id).length >0 &&
                            !!reservationsContext.getReservationsByRental(rent.id).find(resa =>
                                parseDate(resa.end).getTime() < today_date.getTime()) ?
                            reservationsContext.getReservationsByRental(rent.id).map(reservation =>
                                reservation.status === "RESERVATION COMPLETED" &&  
                                parseDate(reservation.end).getTime() < today_date.getTime() &&
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column width={6}>
                                            <a href={"http://localhost:3000/user/" + reservation.client_id}> 
                                            {userContext.getUserbyId(reservation.client_id) &&
                                            userContext.getUserbyId(reservation.client_id)["name"]} 
                                            </a><br/>
                                            {` From : ${reservation.start.slice(0, 10)}`} <br/>
                                            {`To : ${reservation.end.slice(0, 10)} `}
                                        
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            Price : <br/> 
                                            {getPrice(reservation.start, reservation.end, reservation.price) + " ???"}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            STATUS : <br/>
                                            {reservation.status}
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            {reservation.owner_review === false ?
                                            <Review id={reservation.id} isClient={false} reviewer_id={reservation.owner_id} reviewed_id={reservation.client_id}/> :
                                            "Reviewed"
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid >) :
                                <p>You had no reservations on this ad</p>
                            }
                        </Segment>
                    </Grid.Column> :
                    ""
                ))}
                 <Grid.Column> 
                    {noAds}
                    <br/>
                </Grid.Column>
            </Grid>
        </div>
    )
}