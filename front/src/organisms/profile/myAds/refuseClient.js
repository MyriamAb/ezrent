import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import useReservations from '../../../context/reservation'

export default function RefuseClient(prop){
    const [open, setOpen] = React.useState(false)
    const reservationsContext = useReservations()

    function refuseReservation(id, status){
      console.log("this is the ID : " + status)
      reservationsContext.editProfile(id, status)
      setOpen(false)
    }

    return (
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size='small'
          trigger={<Button negative>Refuse</Button>}
        >
          <Header icon>
            <Icon name='bullhorn' />
            Your are about to refuse a reservation.
          </Header>
          <Modal.Content>
            <p>
                Do you want to refuse the reservation of {prop.clientName} ?
                
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={() => refuseReservation(prop.reservationId, "REFUSED")}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )
}