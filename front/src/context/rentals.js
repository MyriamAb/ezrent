import { createContext, useContext, useEffect, useState } from 'react'

const RentalsContext = createContext();

export function RentalsProvider({ children }) {
  const [allRentals, setAllRentals] = useState(null)
  const [rental, setRental]= useState(null)
  const [resultSearch, setResultSearch] = useState(null)

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

  function getRentalById(id){
    const rental = allRentals.find(el => el.id == id)
    return rental
  }

  useEffect(()=>{
    setResultSearch(allRentals)
  },[allRentals])

  function search(result){
    setResultSearch(result)
  }
  
  return (
    <RentalsContext.Provider value={{allRentals, resultSearch, getRental, getMyRentals, postAd, getRentalById, search}}>
        {children}
    </RentalsContext.Provider>
  )
}

export default function useRentals() {
  return useContext(RentalsContext);
}
