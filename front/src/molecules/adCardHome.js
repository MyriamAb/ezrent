import React from 'react'
import { CarouselProvider, Slider} from "pure-react-carousel";
import { Card } from "semantic-ui-react";
import CardType from "../molecules/card";
import ImageCarousel from '../molecules/imageCarousel'

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
    /* <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1.25}
    totalSlides={3}
    style={{ width: "300px" }}
  >
    
    <Slider>
      <CardType
        image="https://place-hold.it/800x800&text=Matthew&fontsize=32"
        index={0}
        header="Matthew House"
        meta="Friend"
      />
      <CardType
        header="Elliot Baker"
        image="https://place-hold.it/800x800&text=Elliot&fontsize=32"
        index={1}
        meta="Friend"
      />
      <CardType
        header="Steve Sanders"
        image="https://place-hold.it/800x800&text=Steve&fontsize=32"
        index={2}
        meta="Friend"
      />
    </Slider>

    <CustomDotGroup slides={3} />
  </CarouselProvider> */

}


export default CardCarousel;
