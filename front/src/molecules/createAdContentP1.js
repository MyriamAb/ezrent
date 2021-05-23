import React from 'react'
import { Table, Grid, Header } from 'semantic-ui-react'
import TextAreaType from '../atoms/textArea'
import SearchAddress from '../molecules/searchAddress'
import Input from '../atoms/input'
import Select from '../atoms/select'
import Checkbox from '../atoms/checkbox'

export default function AdPartie1 () {
const optionServiceSelect = [
  { key: '1', value: '1', text: '1 person' },
  { key: '2', value: '2', text: '2 persons' },
  { key: '3', value: '3', text: '3 persons' },
  { key: '4', value: '4', text: '4 persons' },
  { key: '5', value: '5', text: '5 persons' },
  { key: '6', value: '6', text: '6 persons' },
  { key: '7', value: '7', text: '7 persons' },
  { key: '8', value: '8', text: '8 persons' },
  { key: '9', value: '9', text: '9 persons' },
  { key: '10', value: '10', text: '10 persons' },
  { key: '11', value: '11', text: '11 persons' },
  { key: '12', value: '12', text: '12 persons' },
  { key: '13', value: '13', text: '13 persons' },
  { key: '14', value: '14', text: '14 persons' }
]

return (
  <div>
    <SearchAddress />
    <Input icon="home" placeholder='Title of your ad...' iconPosition='left'/>
    <TextAreaType placeholder='Write a description of your ad...' minWidth={ 800 } minHeight={ 100 } marginLeft='auto' marginRight='auto' marginTop={15}/>
    <Select placeholder="Logement's capacity" options={optionServiceSelect} style={{ marginTop: 15 }}/>
    <div style={{ border: '1px solid grey', marginTop:15 }}>
      <Header as='h3' style={{ marginTop:5 }}>Choose services for your ad:</Header>
      <Grid columns={2} style={{ marginBottom: 2 }}>
        <Grid.Row>
          <Grid.Column>
            <Checkbox label="Vacation" value="vacation" />
          </Grid.Column>
          <Grid.Column>
            <Checkbox label="Party" value="party" />
          </Grid.Column>
          <Grid.Column>
            <Checkbox label="Photo Shooting" value="photo_shooting" />
          </Grid.Column>
          <Grid.Column>
            <Checkbox label="Movie Shooting" value="movie_shooting" />
          </Grid.Column>
            <Grid.Column>
              <Checkbox label="Celebration" value="celebration" /> 
            </Grid.Column>
            <Grid.Column>
              <Checkbox label="Seminaries" value="seminaries" /> 
            </Grid.Column>
            <Grid.Column>
              <Checkbox label="Business trip" value="business_trip" />
            </Grid.Column>
            <Grid.Column>
              <Checkbox label="Other" value="other" />    
            </Grid.Column>
          </Grid.Row>
      </Grid>
    </div>
  </div>
  )
}
