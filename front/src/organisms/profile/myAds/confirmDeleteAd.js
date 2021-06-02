import React from 'react'
import { Button, Header, Icon, Modal, Message } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import useReservations from '../../../context/reservation'
import useRentals from '../../../context/rentals'

export default function ConfirmDeleteAd(prop){
    const [open, setOpen] = React.useState(false)
    const reservationsContext = useReservations()
    const rentalsContext = useRentals()
    const history = useHistory();
    const resAd = reservationsContext.getReservationsByRental(parseInt(prop.id))

    function confirmDelete(e, id){
      e.preventDefault()
      if (resAd.find(element => element.status === "RESERVATION COMPLETED")){
        console.log("pas possible")
        rentalsContext.editMsg({deleteImpossible:"Removal impossible : you have some completed reservations for this ads"})
        setOpen(false)
      }
      else{
        rentalsContext.deleteAd(id)
        resAd.forEach(element => reservationsContext.editRes(element.id, "UNAVAILABLE"))
        setOpen(false)
        history.push({pathname:'/profile'})
      }  
    }

    return (
        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size='small'
          trigger={<Button negative>Delete the ad</Button>}
        >
          <Header icon>
            <Icon name='bullhorn' />
            Your are about to delete an ad
          </Header>
          <Modal.Content>
            <p>Are you sure you want to permanently delete this ad ? </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={(e) => confirmDelete(e, parseInt(prop.id))}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      )
}