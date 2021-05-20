import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";
import ImageSlide from '../atoms/imageSlide'
import CustomDotGroup from "../atoms/cardDotGroup";

function ImageCarousel(props) {

  return (

  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={props.nbSlide}
  >
      <Slider>
        <ImageSlide index={0} src="http://placeimg.com/300/300/arch?t=1621458436225"/>
        <ImageSlide index={1} src="http://placeimg.com/300/300/arch?t=1621458403576"/>
        <ImageSlide index={2} src="http://placeimg.com/300/300/arch?t=1621458420188" />
      </Slider>

   
    <CustomDotGroup slides={3} />
  </CarouselProvider>
  )
}

export default ImageCarousel;