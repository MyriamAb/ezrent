import React from 'react'
import { Card, Pagination } from "semantic-ui-react";
import CardType from "../molecules/cardType";
import "pure-react-carousel/dist/react-carousel.es.css"
import useRentals from '../context/rentals'

function CardCarousel() {
  var cardItem= []  
  const rentalsContext = useRentals()
  var rentals = rentalsContext?.resultSearch ?? null;
  var totalPages= rentals?.length / 10
 
  if (rentals === null) {
    cardItem=(<Card></Card>)
  }
  else {
    for (let i = 0; i < rentals.length; i++) {
      cardItem.push(
        <CardType title={rentals[i].title} description={rentals[i].description} price={rentals[i].price} location={rentals[i].address} id={rentals[i].id} style={{ marginTop: '3px' }}/>
    )  
  }
  } 

  return (
     <div>
    <Card.Group itemsPerRow={5}>
      {cardItem}
    </Card.Group>
{/*     <Pagination defaultActivePage={1} totalPages={totalPages}/>
 */}    </div>
  )  
  
}


export default CardCarousel;
