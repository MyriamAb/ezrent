import React from 'react'
import InputType from '../atoms/input'
import SelectType from '../atoms/select'

function Search(props) {
  const optionService = [
    { key: 'ph', value: 'ph', text: 'Photo Shooting' },
    { key: 'va', value: 'va', text: 'Vacation' }
  ]
  return (
    <div style={props.style}>
      <InputType icon="search" iconPlaceholder="right" type="text" name="search" placeholder="Search" style={{width:300}}/>
      <InputType icon="map marker alternate" iconPlaceholder="right" type="text" name="location" placeholder="Location" style={{width:300}} />
      <InputType icon="euro sign" iconPlaceholder="right" type="text" name="minPrice" placeholder="Min Price" style={{width:300}}/>
      <InputType icon="euro sign" iconPlaceholder="right" type="text" name="maxPrice" placeholder="Max Price" style={{width:300}}/>
      <SelectType placeholder="Select an activity" options={optionService} style={{width:300}}/>
    </div>
    
  )
}

export default Search