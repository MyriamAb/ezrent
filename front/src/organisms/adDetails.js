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
  var disabledDates = []
  const rentalsContext = useRentals()
  var rentals = rentalsContext?.allRentals ?? null;
  const [rental, setRental] = useState({})
  const { id } = useParams()
  const [ price, setPrice] = useState('0')
  const [ valueCalendar, onChangeCalendar ] = useState(new Date())
  let changePrice = (newPrice) => {
    setPrice( newPrice )
  }

  useEffect(() => {
    const res = rentals?.find(element => element.id == id) 
      setRental(res)
  }, [id, rentals])

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
    //Make a range with 2 dates
    function getDates(startDate, endDate) {
      var currentDate = startDate
      var addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      while (currentDate <= endDate) {
        disabledDates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      return disabledDates;
    }
  var EndDate = new Date(rental?.end)
  var realEndDate = EndDate?.setDate(EndDate?.getDate()+1)
   disabledDates = getDates(new Date(), new Date(rental?.start), getDates(new Date(realEndDate), new Date(2025, 0, 1)))                                                                                                          


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
                  returnValue='range'
                  tileDisabled={({date, view}) =>
                  (view === 'month') && // Block day tiles only
                   disabledDates.some(disabledDate =>
                    date.getFullYear() === disabledDate.getFullYear() &&
                    date.getMonth() === disabledDate.getMonth() &&
                    date.getDate() === disabledDate.getDate()
                    )}
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