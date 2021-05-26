import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ReservationsContext = createContext();
export function ReservationsProvider({ children }) {
  const [allReservations, setAllReservations] = useState(null)
  const [Reservation, setReservation]= useState(null)
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

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

  const editProfile = useCallback((id, data) => {
    const body_update = {status : data}
    fetch('http://localhost:5000/reservations/' + id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body_update)
      })
      .then(response => response.json())
      .then(Refreshfct())
    }, []);

  function Refreshfct(){
    setRefresh(prev => (!prev))
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
    <ReservationsContext.Provider value={{allReservations, getReservation, getMyReservations, getReservationsByRental, editProfile}}>
        {children}
    </ReservationsContext.Provider>
  )
}

export default function useReservations() {
  return useContext(ReservationsContext);
}
