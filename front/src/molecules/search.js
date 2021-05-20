import React from 'react'
import InputType from '../atoms/input'
import SelectType from '../atoms/select'
import Checkbox from '../atoms/checkbox'

function Search(props) {
  const optionService = [
    { key: 'di', value: 'di', text: 'Select an activity' },
    { key: 'va', value: 'va', text: < Checkbox label="Vacation" value="vacation" /> },
    { key: 'pa', value: 'pa', text: <Checkbox label="Party" value="party" />},
    { key: 'ph', value: 'ph', text: <Checkbox label="Photo Shooting" value="photo_shooting" />},
    { key: 'mo', value: 'mo', text: <Checkbox label="Movie Shooting" value="movie_shooting" />},
    { key: 'ce', value: 'ce', text: <Checkbox label="Celebration" value="celebration" /> },
    { key: 'se', value: 'se', text: <Checkbox label="Seminaries" value="seminaries" /> },
    { key: 'bu', value: 'bu', text: <Checkbox label="Business trip" value="business_trip" /> }
    
  ]
  return (
    <div style={props.style}>
      <InputType icon="search" iconPlaceholder="right" type="text" name="search" placeholder="Search" style={{width:200}}/>
      <InputType icon="map marker alternate" iconPlaceholder="right" type="text" name="location" placeholder="Location" style={{width:200}} />
      <InputType icon="euro sign" iconPlaceholder="right" type="text" name="minPrice" placeholder="Min Price" style={{width:100}}/>
      <InputType icon="euro sign" iconPlaceholder="right" type="text" name="maxPrice" placeholder="Max Price" style={{ width: 100 }} />
      <InputType  type="text" name="maxPrice" placeholder="Date" style={{width:100}}/>
      <SelectType placeholder="Select an activity" options={optionService} style={{width:200}}/>
    </div>
    
  )
}

export default Search