import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default function ConfirmClient(prop){
    const [open, setOpen] = React.useState(false)

    function confirmReservation(){
        
    }

    return (
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size='small'
          trigger={<Button>Confirm</Button>}
        >
          <Header icon>
            <Icon name='bullhorn' />
            Your are about to confirm a reservation.
          </Header>
          <Modal.Content>
            <p>
                Do you confirm the reservation of {prop.clientName} ?
                
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={() => confirmReservation()}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )
}