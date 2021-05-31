import React, { useState } from 'react'
import { Menu, Icon, Grid } from 'semantic-ui-react'
import SelectNumber from '../atoms/numberInput'
import CalendarType from '../atoms/calendar'
import ButtonImage from '../atoms/buttonImage'

export default function AdPartie2 (props) {
  const [ price, setPrice] = useState({price:'0'})
  
return (
  <div>
  <Menu>
    <Menu.Item as='a'>
      <Icon name='eur' /> Choose your price:
    </Menu.Item>
    <SelectNumber value={price.price} onChange={(newPrice) => {
        setPrice({price: newPrice})
        if (props.onChangePrice){
          props.onChangePrice({price: newPrice})
        }
      }} priceType='integer' size='small'/>
  </Menu>
    <Grid columns={2}>
      <Grid.Column>
        <CalendarType
        id='calendar'
        onChange={props.onChange}
        tileDisabled={props.tileDisabled}
        returnValue='range'
        />
      </Grid.Column>
      <Grid.Column>
        <ButtonImage
        onChange={props.onChangeImage}
        id={props.id}
        />
        {props.tabImage}
      </Grid.Column>
  </Grid>
  </div>
  )
}
