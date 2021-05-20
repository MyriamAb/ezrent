import React from 'react'
import { CarouselProvider } from "pure-react-carousel";
import { Card } from "semantic-ui-react";
import CardType from "../molecules/card";
import "pure-react-carousel/dist/react-carousel.es.css"

function CardCarousel() {
  
  return (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1.25}
    totalSlides={3}
    style={{ width: "300px" }}
  >
      
    <Card>
      {/* <ImageCarousel /> */}
      <CardType name="appart" decription="trop beau" price="100" location="Paris" />
    </Card>
  </CarouselProvider>
  )  
  
}


export default CardCarousel;
