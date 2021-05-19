import React from 'react'
import { Modal } from 'semantic-ui-react'
import RatingType from '../atoms/rate'
import TextAreaType from '../atoms/textArea'
import ButtonType from '../atoms/button'

export default function Review () {
const [open, setOpen] = React.useState(false)

return (
  <Modal
    dimmer='blurring'
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<ButtonType color='green' content="Add a review"/>}
    >
    <Modal.Header>
          Add your review about Claclacoucou:
          <RatingType size='huge' float='right'/>
    </Modal.Header>
    <Modal.Content>
          <TextAreaType placeholder='Write your comment...' minWidth={ 800 } minHeight={ 100 } marginLeft='auto' marginRight='auto'/>
    </Modal.Content>
    <Modal.Actions>
      <ButtonType color='red' content="Cancel" size='large' onClick={() => setOpen(false)}/>
      <ButtonType color='green' content="Send" size='large' onClick={() => setOpen(false)}/>
    </Modal.Actions>
    </Modal>
  )
}
