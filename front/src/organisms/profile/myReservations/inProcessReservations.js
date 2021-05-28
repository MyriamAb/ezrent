import React, {useEffect, useState} from 'react'
import { Grid, Segment, Header, Button, Icon } from 'semantic-ui-react'
import useRentals from '../../../context/rentals'
import useUser from '../../../context/user'
import useReservations from '../../../context/reservation'

export default function InProcessReservations(){
    const reservationsContext = useReservations()
    const rentalsContext = useRentals()
    const userContext = useUser()
    const today_date = new Date()
    const myRentals = rentalsContext.getMyRentals(userContext.user.id)
    const myReservations = reservationsContext.getMyReservations(userContext.user.id)


    function parseDate(str) {
        var datesplit = str.slice(0, 10);
        var mdy = datesplit.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]); 
    }

    function cancelReservation(id, status){
      reservationsContext.editRes(id, status)
    }

    return(
        <div>
            <Grid container columns={1} stackable>
                <br/>
                <Header as='h2'> <i class="hourglass half icon"></i> IN PROCESS</Header>
                {myReservations.map((reserv, ind)=>(
                    (parseDate(reserv.end).getTime() >= today_date.getTime() && reserv.status !=="CANCELLED") 
                    && rentalsContext.allRentals &&
                    <Grid.Column  key={ind}> 
                        <Header as='h3' block attached='top'>{rentalsContext.getRentalById(reserv.rental_id).title}</Header>
                        <Segment attached> {rentalsContext.getRentalById(reserv.rental_id).address}</Segment>
                        <Segment attached>
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column width={5}> 
                                            {` From : ${reserv.start.slice(0, 10)}`} <br/>
                                            {`To : ${reserv.end.slice(0, 10)} `}
                                        
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            STATUS : <br/>
                                            {reserv.status}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {reserv.status === "WAITING FOR OWNER'S APPROVAL" ?
                                            <Icon color='green' name='wait' size='big'/>:
                                            reserv.status === "WAITING FOR CLIENT'S PAIEMENT" ?
                                            <Button primary> Paiement </Button> :
                                            reserv.status === "REFUSED" || reserv.status === "CANCELLED"?
                                            <Icon color='red' name='close' size='big'/> :
                                            <Icon color='green' name='check' size='big'/> 
                                            }
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                        {
                                        reserv.status !== "WAITING FOR OWNER'S APPROVAL" &&
                                         reserv.status !== "RESERVATION COMPLETED" && 
                                         reserv.status !== "CANCELLED" ?
                                        <Button onClick={() => cancelReservation(reserv.id, "CANCELLED")} negative> Cancel the reservation </Button>:
                                        ""
                                        }    
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid >
                        </Segment>
                    </Grid.Column> 
                    ))}
            </Grid>
        </div>
    )
}