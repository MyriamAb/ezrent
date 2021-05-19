import React from 'react'
import InputType from '../atoms/input'
import SelectType from '../atoms/select'
import { Container } from 'semantic-ui-react'

function Search(props) {
  const optionService = [
    { key: 'ph', value: 'ph', text: 'Photo Shooting' },
    { key: 'va', value: 'va', text: 'Vacation' }
  ]
  return (
    <div style={props.styles}>
      <InputType icon="search" iconPlaceholder="right" type="text" name="search" placeholder="Search" />
      <InputType icon="map marker alternate" iconPlaceholder="right" type="text" name="location" placeholder="Location" />
      <InputType icon="euro sign" iconPlaceholder="right" type="text" name="minPrice" placeholder="Min Price"/>
      <InputType icon="euro sign" iconPlaceholder="right" type="text" name="maxPrice" placeholder="Max Price"/>
      <SelectType placeholder="Select an activity" options={optionService}/>
    </div>
    
  )
}

export default Search