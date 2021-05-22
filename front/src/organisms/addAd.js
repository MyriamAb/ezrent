import AdPartie1 from '../molecules/createAdContentP1'
import AdPartie2 from '../molecules/createAdContentP2'
import React, { useState } from 'react'
import { Icon, Modal } from 'semantic-ui-react'
import Button from '../atoms/button'

export default function ModalMultiple() {
  const [firstOpen, setFirstOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setFirstOpen(true)} content="Add an ad"></Button>
      <Modal
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>         
          Do you want rent a place? Good place for that
        </Modal.Header>
        <Modal.Content>
          <AdPartie1/>
        </Modal.Content>
        <Modal.Actions>
          <Button 
          onClick={() => setFirstOpen(false)} 
          content='Cancel'
          basic color='red'
          icon='cancel'
          iconPosition='right'
          />
          <Button 
          onClick={() => setSecondOpen(true)} 
          content='Next Step'
          basic color='teal'
          icon='right chevron'
          iconPosition='right'
          />
        </Modal.Actions>

        <Modal
          open={secondOpen}
          size='small'
        >
          <Modal.Header>
            Do you want rent a place? Good place for that
          </Modal.Header>
          <Modal.Content>
            <AdPartie2/>
          </Modal.Content>
          <Modal.Actions>
          <Button
              icon='arrow left'
              content='Preceed'
              basic color='orange'
              onClick={() => {setSecondOpen(false); setFirstOpen(true)}}
            />
            <Button
              icon='check'
              content='All Done'
              basic color='green'
              onClick={() => {setSecondOpen(false); setFirstOpen(false)}}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  )
}

