import React from 'react'
import { Modal } from 'semantic-ui-react'
import TextAreaType from '../atoms/textArea'
import ButtonType from '../atoms/button'
import SearchAddress from '../molecules/searchAddress'
import Input from '../atoms/input'
import Select from '../atoms/select'

export default function Review () {
const [open, setOpen] = React.useState(false)
const optionService = [
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
  <Modal
    dimmer='blurring'
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<ButtonType color='green' content="Add a ad"/>}
    >
    <Modal.Header>
         Do you want rent a place? Good place for that
    </Modal.Header>
    <Modal.Content>
      <SearchAddress />
      <Input placeholder='Title of your ad...' />
      <TextAreaType placeholder='Write a description of your ad...' minWidth={ 800 } minHeight={ 100 } marginLeft='auto' marginRight='auto'/>
      <Select placeholder="Logement's capacity" options={optionService}/>
    </Modal.Content>
    <Modal.Actions>
      <ButtonType color='red' content="Cancel" size='large' onClick={() => setOpen(false)}/>
      <ButtonType color='green' content="Submit" size='large' onClick={() => setOpen(false)}/>
    </Modal.Actions>
  </Modal>
  )
}
