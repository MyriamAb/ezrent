import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ReservationsContext = createContext();
export function ReservationsProvider({ children }) {
  const [allReservations, setAllReservations] = useState(null)
  const [Reservation, setReservation]= useState(null)

  useEffect(()=> {
      fetch('http://localhost:5000/reservations', {
        method: "get",
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        })
          .then(response => response.json())
          .then(data => setAllReservations(data))
  }, []);

  function getReservation(id) {
    console.log('entre context')
    fetch('http://localhost:5000/reservations/' +id, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
              },
    })
      .then(response => response.json())
      .then(data => setReservation(data))
      
  }

  function getMyReservations(id){
    const myReservations = []
    if (allReservations !== null){
      for(var i=0; i<allReservations.length;i++){
        if(allReservations[i].client_id === id)
            myReservations.push(allReservations[i])
      }
    }
    return myReservations
  }

  function getMyReservations(id){
    const myReservations = []
    if (allReservations !== null){
      for(var i=0; i<allReservations.length;i++){
        if(allReservations[i].client_id === id)
            myReservations.push(allReservations[i])
      }
    }
    return myReservations
  }

  function getReservationsByRental(rentalId){
    const reservations = []
    if (allReservations !== null){
      for(var i=0; i<allReservations.length;i++){
        if(allReservations[i].rental_id === rentalId)
            reservations.push(allReservations[i])
      }
    }
    return reservations
  }
  
  return (
    <ReservationsContext.Provider value={{allReservations, getReservation, getMyReservations, getReservationsByRental}}>
        {children}
    </ReservationsContext.Provider>
  )
}

export default function useReservations() {
  return useContext(ReservationsContext);
}
