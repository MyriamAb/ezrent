import React from 'react'
import { Card } from "semantic-ui-react";
import CardType from "../molecules/cardType";
import "pure-react-carousel/dist/react-carousel.es.css"
import useRentals from '../context/rentals'

function CardCarousel() {
  var cardItem= []  
  const rentalsContext = useRentals()
  var rentals = rentalsContext?.allRentals ?? null;
 

  if (rentals === null) {
    cardItem=(<Card></Card>)
  }
  else {
    for (let i = 0; i < rentals.length; i++) {
      cardItem.push(
        <CardType rentals={rentals[i]} title={rentals[i].title} description={rentals[i].description} price={rentals[i].price} location={rentals[i].address} id={rentals[i].id} style={{ marginTop: '3px' }}/>
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
