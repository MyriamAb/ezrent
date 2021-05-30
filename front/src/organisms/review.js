import React, { useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import RatingType from '../atoms/rate'
import TextAreaType from '../atoms/textArea'
import ButtonType from '../atoms/button'
import useUser from '../context/user'
import useReservations from '../context/reservation'

export default function Review(props) {
  const userContext = useUser();
  const reservationContext = useReservations();
  const [open, setOpen] = React.useState(false)
  const [reviewed, setReviewed] = useState(userContext.getUserbyId(props.reviewed_id))
  const [data, setData] = useState({
    grade: 0,
    comment: ""
  })

  function handleComment(e){
    const newdata = { ...data }
    newdata['comment'] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function handleGrade(e) {
    const newdata = { ...data }
    newdata['grade'] = parseInt(e.target.getAttribute("aria-posinset"))
    setData(newdata)
    console.log(newdata)
  }

  function submit(bool) {
    setOpen(false);
    if (bool == true) {
      userContext.postReviewFromClient(data, props.reviewer_id, props.reviewed_id)
      reservationContext.updateReservationReview(props.id, props.isClient)
    }
    else {
      setData({ grade: 0, comment: "" });
    }
  }
 
return (
  <Modal
    dimmer='blurring'
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<ButtonType color='green' content="Add a review"/>}
    >
    <Modal.Header>
          Add your review about : {reviewed?.name}
          <RatingType id='grade' onRate={(e) => handleGrade(e)} size='huge' float='right'/>
    </Modal.Header>
    <Modal.Content>
      <TextAreaType id='comment' onChange={(e) => handleComment(e)} placeholder='Write your comment...' minWidth={ 800 } minHeight={ 100 } marginLeft='auto' marginRight='auto'/>
    </Modal.Content>
    <Modal.Actions>
      <ButtonType color='red' content="Cancel" size='large' onClick={() => submit(false)}/>
      <ButtonType color='green' content="Submit" size='large' onClick={() => submit(true)}/>
    </Modal.Actions>
  </Modal>
  )
}
