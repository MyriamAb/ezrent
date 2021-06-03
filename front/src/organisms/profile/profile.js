import React from 'react'
import { Tab } from 'semantic-ui-react'
import PersonnalInfo from './personnalInfo'
import Review from './../review'
import AddAd from './../addAd'
import MyReservations from './myReservations/myReservations'
import MyAds from './myAds/myAds'

function Profile(){
  const panes = [
    { menuItem: 'Personnal information', render: () => <Tab.Pane><PersonnalInfo/></Tab.Pane> },
    { menuItem: 'My reservations', render: () => <Tab.Pane><MyReservations/></Tab.Pane> },
    { menuItem: 'My ads', render: () => <Tab.Pane><MyAds/></Tab.Pane> },
  ]
  
  return (
  <div>
    <AddAd/>
    <Tab menu={{ fluid: true, vertical: true, tabular: false }} panes={panes} />
  </div>)
}

export default Profile
