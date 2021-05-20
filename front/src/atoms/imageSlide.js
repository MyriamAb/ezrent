import PropTypes from "prop-types";
import { Slide } from "pure-react-carousel";
import React from "react";
import { Image } from "semantic-ui-react";

function ImageSlide(props) {
  return (
  <Slide index={props.index}>
    <Image src={props.src} />
  </Slide>
  )
}

export default ImageSlide;