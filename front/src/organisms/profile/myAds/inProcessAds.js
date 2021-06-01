import React, {useEffect, useState} from 'react'
import { Grid, Segment, Header, Button, Icon } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'
import useReservations from '../../../context/reservation'
import ConfirmClient from './confirmClient'
import RefuseClient from './refuseClient'

export default function InProcessAds(){
    const reservationsContext = useReservations()
    const rentalsContext = useRentals()
    const userContext = useUser()
    const today_date = new Date()
    const myRentals = rentalsContext.getMyRentals(userContext.user.id)

    function parseDate(str) {
        var datesplit = str.slice(0, 10);
        var mdy = datesplit.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }

    return(
        <div>
            <Grid container columns={1} stackable>
            {myRentals.find(el => parseDate(el.end).getTime() >= today_date.getTime()) ?
                myRentals.map((rent, ind)=>(
                    (parseDate(rent.end).getTime() >= today_date.getTime()) && 
                    <Grid.Column  key={ind}> 
                        <Header as='h3' block attached='top'>{rent.title}</Header>
                        <Segment attached> <i class="map marker icon"></i>{rent.address}</Segment>
                        <Segment attached>
                            <Header as='h4'>REQUESTS ON THIS AD : </Header>
                            {reservationsContext.getReservationsByRental(rent.id).length >0 ?
                            reservationsContext.getReservationsByRental(rent.id).map(reservation =>
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column width={7}> 
{/*                                             {userContext.getUserbyId(reservation.client_id) &&
                                                userContext.getUserbyId(reservation.client_id)["name"]} <br /> */}
                                            <a href={"http://localhost:3000/user/" + reservation.client_id}>
                                                {userContext.getUserbyId(reservation.client_id) &&
                                                userContext.getUserbyId(reservation.client_id)["name"]}
                                            </a> <br/>
                                            {` From : ${reservation.start.slice(0, 10)}`} <br/>
                                            {`To : ${reservation.end.slice(0, 10)} `}
                                        
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            STATUS : <br/>
                                            {reservation.status}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {reservation.status === "WAITING FOR OWNER'S APPROVAL" ?
                                            <Button.Group>
                                                <ConfirmClient reservationId={reservation.id} clientName={userContext.getUserbyId(reservation.client_id)["name"]}/>
                                                <Button.Or />
                                                <RefuseClient reservationId={reservation.id} clientName={userContext.getUserbyId(reservation.client_id)["name"]}/>
                                            </Button.Group> :
                                            reservation.status === "WAITING FOR CLIENT'S PAIEMENT" ?
                                            <Icon color='green' name='wait' size='big'/>:
                                            reservation.status === "REFUSED" || reservation.status === "CANCELLED" ?
                                            <Icon color='red' name='close' size='big'/> :
                                            <Icon color='green' name='check' size='big'/> 
                                            }
                                        </Grid.Column>
                                    </Grid.Row>

                                </Grid >) :
                                <p>No requests on this ad</p>
                            }
                        </Segment>
                    </Grid.Column> 
                    )):
                    <Grid.Column>
                        <Header as='h1' centered> No ads in process</Header>
                    </Grid.Column>}
            </Grid>
        </div>
    )
}