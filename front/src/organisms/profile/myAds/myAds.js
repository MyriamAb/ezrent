import React from 'react'
import InProcessAds from './inProcessAds'
import PastAds from './pastAds'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: {key: 'InProcessAds', icon: 'hourglass two', content: 'In process'}, render: () => <Tab.Pane><InProcessAds/></Tab.Pane>,},
  { menuItem: {key: 'Past', icon: 'hourglass three', content: 'Past'}, render: () => <Tab.Pane><PastAds/></Tab.Pane> },
]

const MyAds = () => <Tab panes={panes} />

export default MyAds