import React from "react";
import { Card, Icon } from "semantic-ui-react";
import ImageCarousel from '../molecules/imageCarousel'


function AdDetails(props) {
  const images = [
    { id: 1, rental_id: 1, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 2, rental_id: 1, src: "http://placeimg.com/300/300/arch?t=1621458403576" }
   ]
  return (
    <div>
      card detail
      {/* <ImageCarousel/>
      {props.title}
      {props.description}
      {props.price}
      {props.owner}
      {props.rate}
      {props.location} */}
    </div>

  )
}
export default AdDetails