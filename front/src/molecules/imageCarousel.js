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
  

  
  
  console.log(pictures.length)
  if (pictures === null || pictures.length === 0 ) {
    console.log("entree dans le if nul 0")
    slide.push(<ImageSlide src="/noPicture.png" href={"/addetails/" + props.rental_id}/>)
  }
  else {
    pictures.forEach((el, i) => {
        slide.push(
          <ImageSlide key={i} index={i} src={el.blob} href={"/addetails/" + el.rental_id} rentals={props.rentals_id}/>
          )
        
    })
  }
  // console.log(rentalImages)
  // console.log(nbSlides)
  //console.log(slide) 
  
  
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