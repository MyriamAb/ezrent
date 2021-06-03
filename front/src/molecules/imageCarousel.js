import { CarouselProvider, Slider } from "pure-react-carousel";
import React from "react";
import ImageSlide from '../atoms/imageSlide'
import CustomDotGroup from "../atoms/cardDotGroup";
import "pure-react-carousel/dist/react-carousel.es.css"
import useRentals from "../context/rentals"

function ImageCarousel(props) {
  const rentalsContext = useRentals()
  const pictures = rentalsContext.picturesByRentalId(props.rental_id)
  var slide = []
  var nbSlides = pictures.length === 0 ? 1 : pictures.length
  
  if (pictures === null || pictures.length === 0 ) {
    slide.push(<ImageSlide src="/noPicture.png" href={"/addetails/" + props.rental_id}/>)
  }
  else {
    pictures.forEach((el, i) => {
        slide.push(
          <ImageSlide key={i} index={i} src={el.blob} href={"/addetails/" + el.rental_id} rentals={props.rentals_id}/>
          )
        
    })
  }
  
  return (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={nbSlides}
    styles={props.styles}
  >
      <Slider>
        {slide}
      </Slider>
    <CustomDotGroup slides={nbSlides} />
  </CarouselProvider>
  )
}

export default ImageCarousel;