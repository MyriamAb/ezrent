import React from 'react'
import InProcessReservations from './inProcessReservations'
import PastReservations from './pastReservations'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: {key: 'InProcessReservations', icon: 'hourglass two', content: 'In process'}, render: () => <Tab.Pane><InProcessReservations/></Tab.Pane>,},
  { menuItem: {key: 'PastReservations', icon: 'hourglass three', content: 'Past'}, render: () => <Tab.Pane><PastReservations/></Tab.Pane> },
]

const MyAds = () => <Tab panes={panes} />

export default MyAds