import React, { useCallback } from "react";
import { Icon, Item, Grid, Container, Header, Image } from "semantic-ui-react";
import Reviews_Public from '../organisms/profile/public/reviews_public'
import useRentals from "../context/rentals"
import useReservations from '../context/reservation'
import CalendarType from '../atoms/calendar'
import { useParams } from "react-router"
import RatingType from '../atoms/rate'
import { useEffect, useState} from 'react'
import ButtonType from '../atoms/button'
import useUser from '../context/user'
import ImageCarousel from '../molecules/imageCarousel'

/* import PaymentMethod from '../organisms/customPayment/paymentMethod'
*/
let tmpbook = []
let displayAct = []
function AdDetails(props) {
  var disabledDates = []
  var rangeDates = []
  const rentalsContext = useRentals()
  const reservationContext = useReservations()
  var rentals = rentalsContext?.allRentals ?? null
  var pictures = rentalsContext?.pictures ?? null
  var activities = rentalsContext?.activities ?? null
  var reservations = reservationContext?.allReservations ?? null
  const [rental, setRental] = useState({})
  const { id } = useParams()
  var ownerId = ''
  const userContext = useUser()
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('')
  const [resa, setResa] = useState([])
  const [activitie, setActivitie] = useState('')
  const [price, setPrice] = useState(0)
  const [valueCalendar, onChangeCalendar] = useState(new Date())
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    const res = rentals?.find(element => element.id == id) 
    setRental(res)
    const pic = pictures?.find(element => element.rental_id == id)
    setPicture(
      pic?.image_blob === null ||  pic?.image_blob === undefined ? 
                        "/noPicture.png":
    typeof(pic?.image_blob) === 'string' ?
    pic?.image_blob :
    new Buffer.from(pic?.image_blob.data,'base64').toString())
      if (res === null || res === undefined)
        return
       ownerId = res.owner_id
      }, [id, rentals, ownerId, userContext, pictures])
      
  useEffect(() => {
    for (let i=0; i < reservations?.length; i++) {
      if(reservations[i].rental_id == id && reservations[i].status == 'RESERVATION COMPLETED'){
        tmpbook.push({start: reservations[i].start, end:reservations[i].end, id:reservations[i].id })
        setResa(tmpbook)
        }
      }
    },[reservations])

  useEffect(() => {
    const act = activities?.find(element => element.rental_id == id)
    setActivitie(act)
    if (activitie?.vacation == 1){
      displayAct.push(
        <p>
        <Icon color='yellow' name='sun' size='big'/>
          Vacation
        </p>)
    }
    if (activitie?.party == 1){
      displayAct.push(
        <p>
        <Icon color='pink' name='glass martini' size='big'/>
          Party
        </p>)
    }
    if (activitie?.photo_shooting == 1){
      displayAct.push(
        <p>
        <Icon color='purple' name='photo' size='big'/>
          Photo shooting
        </p>)
    }
    if (activitie?.movie_shooting == 1){
      displayAct.push(
        <p>
        <Icon color='green' name='video camera' size='big'/>
          Movie shooting
        </p>)
    }
    if (activitie?.seminaries == 1){
      displayAct.push(
        <p>
        <Icon color='grey' name='users' size='big'/>
          Seminaries
        </p>)
    }
    if (activitie?.business_trip == 1){
      displayAct.push(
        <p>
        <Icon color='yellow' name='building outline' size='big'/>
          Business Trip
        </p>)
    }    
    if (activitie?.other == 1){
      displayAct.push(
        <p>
        <Icon color='dark' name='ellipsis horizontal' size='big'/>
          Other
        </p>)
    }
    return displayAct
  },[activities])

  useEffect(() => {
    const userInfo = userContext?.getUserbyId(ownerId)
    if (userInfo === null || userInfo === undefined)
    return
    
    setUser(userInfo)
  }, [userContext.getUserbyId, userContext, ownerId])
  
  useEffect(() => {
    setDuration(datediff(valueCalendar[0], valueCalendar[1]))
  }, [valueCalendar])

  useEffect(() => {
    if (duration)
      setPrice(duration * rental.price)
  }, [duration])

  function book() {
    var realStartDate = new Date(valueCalendar[0]).setDate(new Date(valueCalendar[0]).getDate() + 1)
    var realEndDate = new Date(valueCalendar[1]).setDate(new Date(valueCalendar[1]).getDate())
    var currentDate = valueCalendar[0]
    var check = false
    var addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= valueCalendar[1]) {
      rangeDates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    disabledDates.forEach(element => {
      rangeDates.forEach(el => {
        if(element.getTime() === el.getTime()){  
          return check = true
        }
      })
    })
    if (check == false) {
      reservationContext.addReservation(rental, new Date(realStartDate), new Date(realEndDate))
      alert("You have booked this location, you'll be notified when the owner check your reservation")
    }
    else {
      alert("Please select days whitout a day off")
    }
  }
  
  function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
  }

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
      marginLeft: 340
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
   if (resa?.length > 0 ) {
     for (let i = 0; i<resa.length; i++){
       disabledDates = getDates(new Date(), new Date(rental?.start), getDates(new Date(resa[i]?.start), new Date(resa[i]?.end)), getDates(new Date(realEndDate), new Date(2023, 0, 1)))                                                                                                          
     }
   }
   else {
     disabledDates = getDates(new Date(), new Date(rental?.start), getDates(new Date(realEndDate), new Date(2023, 0, 1)))                                                                                                          
   }
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
            <ImageCarousel styleImage={styles.image} rental_id={id} />
          </Grid.Row>
        </Grid>
       <Grid celled>
          <Grid.Row>
            <Grid.Column width={11}>
              <Item.Header as='h5'>Description</Item.Header>
              <p>
              {rental?.description}
              </p>
              <Item.Header as='h5'>Activities:</Item.Header>
              <div>
              {displayAct}
              </div>
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
              <Item.Header as='h5'>Price per day :</Item.Header>
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
                  <Grid columns={2}>
                    <Grid.Column>
                      <a href={"http://localhost:3000/user/" + user.id}>
                            {user.name}
                        </a> <br/>
                    </Grid.Column>
                    <Grid.Column>
                      {user.email}
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column>   
                  <RatingType size='huge' float='right'/>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={5}>
              <Grid.Row>
                {"Total price : " + price + " €"}
              </Grid.Row>
               <Grid.Row>
                  <ButtonType color='green' content="Book" size='large' onClick={e => book()} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Reviews_Public id={user.id}/>
        {/* <Comments/> */}
   </Grid>
    </Container>
    </div>

  )
}
export default AdDetails