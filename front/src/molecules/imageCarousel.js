import { CarouselProvider, Slider } from "pure-react-carousel";
import React from "react";
import ImageSlide from '../atoms/imageSlide'
import CustomDotGroup from "../atoms/cardDotGroup";
import "pure-react-carousel/dist/react-carousel.es.css"

function ImageCarousel(props) {
  var slide = null
  var nbSlides = 0
  var rentalImages = []
   const images = [
    { id: 1, rental_id: 1, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 2, rental_id: 1, src: "http://placeimg.com/300/300/arch?t=1621458403576" },
    { id: 3, rental_id: 2, src: "http://placeimg.com/300/300/arch?t=1621458420188" },
    { id: 4, rental_id: 2, src: "http://placeimg.com/300/300/arch?t=1621511961424" },
    { id: 5, rental_id: 3, src: "http://placeimg.com/300/300/arch?t=1621512002845" },
    { id: 6, rental_id: 3, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 7, rental_id: 4, src: "http://placeimg.com/300/300/arch?t=1621458420188" },
    { id: 8, rental_id: 5, src: "http://placeimg.com/300/300/arch?t=1621512002845" },
    { id: 9, rental_id: 5, src: "http://placeimg.com/300/300/arch?t=1621511961424" },
    { id: 10, rental_id: 6, src: "http://placeimg.com/300/300/arch?t=1621512002845" },
    { id: 11, rental_id: 6, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 12, rental_id: 7, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 13, rental_id: 7, src: "http://placeimg.com/300/300/arch?t=1621458403576" },
    { id: 14, rental_id: 8, src: "http://placeimg.com/300/300/arch?t=1621512002845" },
    { id: 15, rental_id: 8, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 16, rental_id: 8, src: "http://placeimg.com/300/300/arch?t=1621511961424" },
   ]
  
  
  
  if (images === null) {
    slide=(<Slider></Slider>)
  }
  else {
    images.forEach(el => {
      if (el.rental_id === props.rental_id) {
        nbSlides += 1
        rentalImages.push(el.src)
        
        for (let i = 0; i < rentalImages.length; i++){
          slide = (
            <ImageSlide key={i} index={i} src={rentalImages[i]} href={"/addetails/" + el.rental_id} rentals={props.rentals}/>
            )
          }
        } 
    })
  }
  // console.log(rentalImages)
  // console.log(nbSlides)
  // console.log(slide) 
  
  
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