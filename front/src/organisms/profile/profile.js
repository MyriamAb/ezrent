import React from 'react'
import { Tab } from 'semantic-ui-react'
import PersonnalInfo from './personnalInfo'
import Review from './../review'
import AddAd from './../addAd'

function Profile(){
  const panes = [
    { menuItem: 'Personnal information', render: () => <Tab.Pane><PersonnalInfo/></Tab.Pane> },
    { menuItem: 'My reservations', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'My ads', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]
  
  return (
  <div>
    <Review/>
       <AddAd/>
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  </div>)
}

export default Profile
