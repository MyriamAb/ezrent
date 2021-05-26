import React from "react";
import { Icon, Item, Grid, Container, Header, Image } from "semantic-ui-react";
import Comments from '../molecules/comments'
import useRentals from "../context/rentals"
import CalendarType from '../atoms/calendar'
import { useParams } from "react-router"
import RatingType from '../atoms/rate'
import { useEffect, useState} from 'react'
import ButtonType from '../atoms/button'

function AdDetails(props) {
  var detail = []
  const rentalsContext = useRentals()
  var rentals = rentalsContext?.allRentals ?? null;
  const [rental, setRental] = useState({})
  const { id } = useParams()
  console.log(id)
  const [ price, setPrice] = useState('0')
  const [ valueCalendar, onChangeCalendar ] = useState(new Date())
  let changePrice = (newPrice) => {
    setPrice( newPrice )
  }

  useEffect(() => {
    console.log('id')
    /* if (rentals == null) */
    console.log(rentals)
    const res = rentals?.find(element => element.id == id) 
    console.log(res)
      setRental(res)
  }, [id, rentals])

  console.log(rental)
  
  useEffect(() => {
    
  })

  const styles = {
    container: {
     
      backgroundColor: '#FFFFFF'
    },
    container1: {
      backgroundImage: `url('https://i.ibb.co/LCFVjr4/background-home-resize.jpg')`
    },
    image: {
      width: 500,
      height: 500,
    }
  }
/*   if (rental == null) {
    detail=<div></div>
  }
  else{
    
  } */
  return (
    <div style={styles.container1}>
      <Container style={styles.container}>
        <Grid >
          <Grid.Row>
            <Grid.Column width={11}>
              <Header as='h1' style={{ marginTop:5 }}>{rental?.title}</Header>
            </Grid.Column>
            <Grid.Column width={5}>
              <Icon name='usermap marker alternate' />
              {rental?.address}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Image centered style={styles.image} src={'https://storage.googleapis.com/epc-photos/photo_5a1864ac-62a4-4a09-893a-6b5b85bc0d2d.png'} />
          </Grid.Row>
        </Grid>
       <Grid celled>
          <Grid.Row>
            <Grid.Column width={11}>
              <Item.Header as='h5'>Description</Item.Header>
              <p>
              {rental?.description}
              </p>
            </Grid.Column>
            <Grid.Column width={5}>
              <Grid.Row>
                Choose a date:
                <CalendarType
                  onChange={onChangeCalendar}
                  value={valueCalendar}
                  returnValue='range'
                  tileDisabled={({activeStartDate, date, view }) => date === 0}
                />
              </Grid.Row>
              <Grid.Row> 
              <Item.Header as='h5'>Price per day:</Item.Header>
               {rental?.price}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <Grid columns={3}>
                <Grid.Column>
                  <Image src="/profileDefaultPic.jpeg" style={{width: 50, height: 50}}/>
                </Grid.Column>
                <Grid.Column>
                  Owner Name
                </Grid.Column>
                <Grid.Column>   
                  <RatingType size='huge' float='right'/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <Grid.Row>
                Total price:
                2222 €
              </Grid.Row>
               <Grid.Row>
                  <ButtonType color='green' content="Booked" size='large'  as='a' href='/paymentCheckout' />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Comments/>
        </Grid>
    </Container>
    </div>

  )
}
export default AdDetails