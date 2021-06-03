import { createContext, useContext, useEffect, useState } from 'react'
import useUser from './user'
import useReservations from './reservation'

const RentalsContext = createContext();

export function RentalsProvider({ children }) {
  const reservationsContext = useReservations()
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
  const [refresh, setRefresh] = useState(false);
  const [msg, setMsg]= useState({editAdOK:"", deleteImpossible:""})
  const [pictures, setPictures] = useState([])


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
  }, [refresh]);

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
  }, [refresh])

  useEffect(()=> {
    fetch('http://localhost:5000/activity', {
      method: "get",
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      })
        .then(response => response.json())
        .then(data => setActivities(data))
  }, [allRentals, refresh]);


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

  function editRentals(id, data){
    const body_update = { title: data.title, description: data.description}
    fetch('http://localhost:5000/rentals/' + id, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body_update)
      })
      .then(response => response.json())
      .then(refreshFct())
      .then(setMsg({editAdOK : "Update successful"}))
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
    if(allRentals && allRentals!== null){
      const rental = allRentals.find(el => el.id == id)
      return rental
    }
  }

  function selectRentalsByActivities(id, tab){
    var result = []
    tab.forEach(filter =>{
      activities.forEach(element => {
        if( element.rental_id == id && element[filter.value] === true)
        result.push(element)
      })
    })
    if(result.length === 0)
      return false
    else
      return true 
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
        image_name: data.image_name + '_' 
        +  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        rental_id: data?.data.id,
        image_blob: adPics[i]
      })
    })
    .then(response => response.json())
    .then(refreshFct())
    }
  }

  function deletePictures(idPicture) {
    fetch('http://localhost:5000/pictures/' + idPicture, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then(refreshFct())
  }

  function deleteAd(idAd) {
    const picAd = picturesByRentalId(idAd)
    fetch('http://localhost:5000/rentals/' + idAd, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    .then(
      picAd.forEach(element => 
        deletePictures(element.id))
    )
    .then(refreshFct())
    .catch(err => console.log(err))
  }

  function refreshFct(){
    setRefresh(prev => (!prev))
  }

  function picturesByRentalId(id){
    var pic = pictures.filter(element => element.rental_id === parseInt(id))
    if(pic && pic !== null && pic.length>0){
      for(var i=0 ; i<pic.length;i++){
        if(pic[i].image_blob && pic[i].image_blob !== null )
          pic[i].blob = new Buffer.from(pic[i].image_blob.data,'base64').toString()
      }
    }
    return pic
  }

  function editMsg(msg){
    setMsg(msg)
  }
  
  return (
    <RentalsContext.Provider value={{allRentals, activities, resultSearch, address, ad, refresh, msg, pictures, postPictures, getRental, getMyRentals, getRentalById, postAd, search, searchAddress,
       editRentals, selectRentalsByActivities, postActivities, deletePictures, picturesByRentalId, deleteAd, editMsg }}>
        {children}
    </RentalsContext.Provider>
  )
}

export default function useRentals() {
  return useContext(RentalsContext);
}
