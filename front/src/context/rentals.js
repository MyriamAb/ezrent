import { createContext, useContext, useEffect, useState } from 'react'
import useUser from './user'

const RentalsContext = createContext();

export function RentalsProvider({ children }) {
  const [allRentals, setAllRentals] = useState(null)
  const [rental, setRental]= useState(null)
  const UserContext = useUser()
  const user = UserContext?.user
  const token= UserContext?.token
  const [ad, setAd] = useState(null)
  const [address, setAddress]= useState(null)
  const [dataAd, setDataAd] = useState(null)
  const [resultSearch, setResultSearch] = useState(null)
  const [activities, setActivities] = useState(null)
  const [pictures, setPictures] = useState()


  useEffect(()=> {
      fetch('http://localhost:5000/rentals', {
        method: "get",
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        })
          .then(response => response.json())
          .then(data => setAllRentals(data))
  }, []);

  useEffect(()=> {
    fetch('http://localhost:5000/pictures', {
      method: "GET",
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => setPictures(data))
  }, [])

  function postAd (data, adPics) {
    setDataAd(data)
    fetch('http://localhost:5000/rentals', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        address: data.address,
        capacity: data.capacity,
        price: data.price,
        start: data.start,
        end: data.end,
        longitude: address.features[0].geometry.coordinates[0],
        latitude: address.features[0].geometry.coordinates[1],
        owner_id:user.id
      })
    })
    .then(response=>response.json())
    .then(res=>(setAd(res), postPictures(res, adPics), postActivities(res, data)))
  }

  // Add services to db activities
    function postActivities (res, data) {
      var vacation = false
      var party = false
      var photo_shooting = false
      var movie_shooting = false
      var seminaries = false
      var business_trip = false
      var other = false
      data.services.forEach(element => {
        if (String(element) === 'Vacation') {
          return vacation = true
        }
        if (String(element) === 'Photo Shooting') {
          return photo_shooting = true
        }
        if (String(element) === 'Party') {
          return party = true
        }
        if (String(element) === 'Movie Shooting') {
          return movie_shooting = true
        }
        if (String(element) === 'Seminaries') {
          return seminaries = true
        }
        if (String(element) === 'Business trip') {
          return business_trip = true
        }
        if (String(element) === 'Other') {
          return other = true
        }
      })
      fetch('http://localhost:5000/activity', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          rental_id: res?.data?.id,
          vacation: vacation,
          party: party,
          photo_shooting: photo_shooting,
          movie_shooting: movie_shooting,
          seminaries: seminaries,
          business_trip: business_trip,
          other: other
        })
      })
      .then(response => response.json())
      .then(data => setAllRentals(data))
    }

  async function getRental(id) {
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

  async function searchAddress(inputValue) {
    if (inputValue){
      await fetch('https://api-adresse.data.gouv.fr/search/?q=' + inputValue,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
      .then(response => response.json())
      .then(res => setAddress(res));   
    }
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

  function postPictures(data, adPics) {
        for ( let i = 0; i < adPics.length; i++ ) {
      fetch('http://localhost:5000/pictures', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          image_name: 'cla',
          rental_id: data?.data.id,
          image_blob: adPics[i]
        })
      })
      .then(response => response.json())
      .then(res => setPictures(res))
    }
  }
  
  return (
    <RentalsContext.Provider value={{allRentals, activities, resultSearch, getRental, getMyRentals, getRentalById, postAd, search, searchAddress, address, ad, postPictures, postActivities, pictures }}>
        {children}
    </RentalsContext.Provider>
  )
}

export default function useRentals() {
  return useContext(RentalsContext);
}
