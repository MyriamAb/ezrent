import React, { useState } from 'react'
import { Menu, Icon, Grid } from 'semantic-ui-react'
import SelectNumber from '../atoms/numberInput'
import CalendarType from '../atoms/calendar'
import ButtonImage from '../atoms/buttonImage'

export default function AdPartie2 () {
  const [ price, setPrice] = useState('0')
  const [ valueCalendar, onChangeCalendar ] = useState(new Date())
  let changePrice = (newPrice) => {
    setPrice( newPrice )
  }

return (
  <div>
  <Menu>
    <Menu.Item as='a'>
      <Icon name='eur' /> Choose your price:
    </Menu.Item>
    <SelectNumber value={price} onChange={changePrice} priceType='integer' size='small'/>
  </Menu>
    <Grid columns={2}>
      <Grid.Column>
        <CalendarType
        onChange={onChangeCalendar}
        value={valueCalendar}
        returnValue='range'
        tileDisabled={({activeStartDate, date, view }) => date === 0}
        />
      </Grid.Column>
      <Grid.Column>
        <ButtonImage
        // content='Add a picture' 
        // basic color={props.color}
        // size={props.size}
        // onClick={props.onClick} 
        />
      </Grid.Column>
  </Grid>
  </div>
  )
}
