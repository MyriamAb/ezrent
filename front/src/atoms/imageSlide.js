import { Slide } from "pure-react-carousel";
import React from "react";
import { Image } from "semantic-ui-react";
import "pure-react-carousel/dist/react-carousel.es.css"

function ImageSlide(props) {
  return (
  <Slide index={props.index} key={props.key} >
    <Image src={props.src} as="a" href={props.href} />
  </Slide>
  )
}

export default ImageSlide;