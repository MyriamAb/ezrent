import { createContext, useContext, useEffect, useState } from 'react'

const RentalsContext = createContext();
export function RentalsProvider({ children }) {
  const [allRentals, setAllRentals] = useState(null)

  useEffect(()=> {
      fetch('http://localhost:5000/rentals', {
          method: "get",
        })
          .then(response => response.json())
          .then(data => setAllRentals(data))
  }, []);

  function postAd(data){
    fetch('http://localhost:5000/rentals', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        address: data.address,
        capacity: data.capacity,
        price: data.price,
        start: data.start,
        end: data.end,
        longitude: 45.00,
        latitude: 4.000,
        owner_id:3
      })
    })
    .then(response=>response.json())
    .then(res=>console.log(res))
  }
  
  return (
    <RentalsContext.Provider value={{allRentals, postAd}}>
        {children}
    </RentalsContext.Provider>
  )
}

export default function useRentals() {
  return useContext(RentalsContext);
}
