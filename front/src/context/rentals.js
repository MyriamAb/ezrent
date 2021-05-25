import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const RentalsContext = createContext();
export function RentalsProvider({ children }) {
  const [allRentals, setAllRentals] = useState(null)
  const [rental, setRental]= useState(null)

  useEffect(()=> {
      fetch('http://localhost:5000/rentals', {
        method: "get",
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        })
          .then(response => response.json())
          .then(data => setAllRentals(data))
  }, []);


  async function getRental(id) {
    console.log('entre context')
    fetch('http://localhost:5000/rentals/' +id, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
              },
    })
      .then(response => response.json())
      .then(data => setRental(data))
      
  }

  function getMyRentals(id){
    const myRentals = []
    if (allRentals !== null){
      for(var i=0; i<allRentals.length;i++){
        if(allRentals[i].owner_id === id)
            myRentals.push(allRentals[i])
      }
    }
    return myRentals
  }
  
  return (
    <RentalsContext.Provider value={{allRentals, getRental, getMyRentals}}>
        {children}
    </RentalsContext.Provider>
  )
}

export default function useRentals() {
  return useContext(RentalsContext);
}
