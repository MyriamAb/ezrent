import React, { useEffect, useState} from 'react'
import { Tab } from 'semantic-ui-react'
import PersonnalInfo from './personnalInfo'
import Review from './../review'
import AddAd from './../addAd'
import MyReservations from './myReservations/myReservations'
import MyAds from './myAds/myAds'
import { useParams } from 'react-router'
import useUser from '../../context/user'

function Profile() {
  const userContext = useUser();
  const [location, setLocation] = useState(0)
  const panes = [
    { menuItem: 'Personnal information', render: () => <Tab.Pane onClick={setLocation(0)} ><PersonnalInfo/></Tab.Pane> },
    { menuItem: 'My reservations', render: () => <Tab.Pane><MyReservations/></Tab.Pane> },
    { menuItem: 'My ads', render: () => <Tab.Pane><MyAds/></Tab.Pane> },
  ]

  console.log("coucou")
  console.log("this is profilelocation " + userContext.profileLocation)
  console.log("this is location " + location)

  useEffect(() => {
    setLocation(userContext.profileLocation)
  }, [userContext.profileLocation])

  function handleChange(e, data) {
    setLocation(data.activeIndex)
  }
 
  return (
  <div>
    <Review/>
    <AddAd/>
      <Tab menu={{ fluid: true, vertical: true, tabular: false }} onTabChange={handleChange} panes={panes} activeIndex={ location }/>
  </div>)
}

export default Profile
