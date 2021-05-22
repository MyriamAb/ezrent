import React from 'react'
import { Card } from "semantic-ui-react";
import CardType from "../molecules/cardType";
import "pure-react-carousel/dist/react-carousel.es.css"

function CardCarousel() {
  var cardItem= []
  const ad = [
    { rental_id:1, title: 'Amazing flat', description: 'very good location and city', price: 80, location: 'Paris' },
    { rental_id:2, title: 'Little country house', description: 'very good location and city', price: 80, location: 'Lyon' },
    { rental_id:3, title: 'Old catle', description: 'very good location and city', price: 80, location: 'Orleans' },
    { rental_id:4, title: 'Penthouse', description: 'very good location and city', price: 80, location: 'New York' },
    { rental_id:5, title: 'Zen Flat', description: 'very good location and city', price: 80, location: 'Paris' },
    { rental_id:6, title: 'House with big garden', description: 'very good location and city', price: 80, location: 'Los Angeles' },
    { rental_id:7, title: 'Garage', description:'very good location and city', price: 80, location: 'Lyon' },
    { rental_id:8, title: 'Cosy flat', description:'very good location and city', price: 80, location: 'Tokyo' },
  ]
   
 

  if (ad === null) {
    cardItem=(<Card></Card>)
  }
  else {
    for (let i = 0; i < ad.length; i++) {
      cardItem.push(
        <CardType title={ad[i].title} description={ad[i].description} price={ad[i].price} location={ad[i].location} id={ad[i].rental_id} style={{ marginTop: '3px' }}/>
    )  
  }
  
  } 

  return (
    
    <Card.Group itemsPerRow={5}>
      {cardItem}
    </Card.Group>
  )  
  
}


export default CardCarousel;
