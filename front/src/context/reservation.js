import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import useUser from './user'

const ReservationsContext = createContext();
export function ReservationsProvider({ children }) {
  const userContext = useUser();
  const [allReservations, setAllReservations] = useState(null)
  const [reservation, setReservation]= useState([])
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

  async function getReservation(id) {
    fetch('http://localhost:5000/reservations/' + id, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => setReservation(data))
    
  }

  function addReservation(data) {
    fetch('http://localhost:5000/reservations/', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userContext.token
      },
      body: JSON.stringify({
        "start": data.start,
        "end": data.end,
        "owner_id": data.owner_id,
        "owner_review": false,
        "client_id": userContext?.user?.id,
        "client_review": false,
        "price": data.price,
        "status": "WAITING FOR OWNER'S APPROVAL",
        "rental_id": data.id
      })
    })
    .then(response => response.json())
    .then(Refreshfct())
  }

  const editRes = useCallback((id, data) => {
    const body_update = {status : data}
    fetch('http://localhost:5000/reservations/' + id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userContext.token

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
  
  const updateReservationReview = useCallback((id, isClient) => {
    const body = isClient ? {client_review: true} : {owner_review: true}
    fetch('http://localhost:5000/reservations/' + id, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userContext.token
      },
      body: JSON.stringify(body)
    })
    .then(Refreshfct())
  })

  return (
    <ReservationsContext.Provider value={{
      allReservations, getReservation, getMyReservations,
      getReservationsByRental, editRes, addReservation,
      updateReservationReview, reservation
    }}>
        {children}
    </ReservationsContext.Provider>
  )
}

export default function useReservations() {
  return useContext(ReservationsContext);
}
