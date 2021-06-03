import React, { useEffect, useState} from 'react'
import { Tab } from 'semantic-ui-react'
import PersonnalInfo from './personnalInfo'
import Review from './../review'
import AddAd from './../addAd'
import MyReservations from './myReservations/myReservations'
import MyAds from './myAds/myAds'
import { useParams } from 'react-router'
import useUser from '../../context/user'
import { useHistory } from 'react-router-dom';


function Profile() {
  const userContext = useUser();
  const history = useHistory();
  const [location, setLocation] = useState(0)
  const panes = [
    { menuItem: 'Personnal information', render: () => <Tab.Pane onClick={setLocation(0)} ><PersonnalInfo/></Tab.Pane> },
    { menuItem: 'My reservations', render: () => <Tab.Pane><MyReservations/></Tab.Pane> },
    { menuItem: 'My ads', render: () => <Tab.Pane><MyAds/></Tab.Pane> },
  ]

  useEffect(() => {
    setLocation(userContext.profileLocation)
  }, [userContext.profileLocation])

  function handleChange(e, data) {
    setLocation(data.activeIndex)
  }
 
  if (!userContext.token) {
      history.push('/login')
  }
  
  return (
  <div>
    <AddAd/>
      <Tab menu={{ fluid: true, vertical: true, tabular: false }} onTabChange={handleChange} panes={panes} activeIndex={ location }/>
  </div>)
}

export default Profile
