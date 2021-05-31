import React from 'react'
import InProcessReservations from './inProcessReservations'
import PastReservations from './pastReservations'


export default function MyReservations(){
    return(
        <div>
           <InProcessReservations/>
           <PastReservations/>
        </div>
    )
}