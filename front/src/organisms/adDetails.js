import React from "react";
import { Card, Icon } from "semantic-ui-react";
import ImageCarousel from '../molecules/imageCarousel'
import useRentals from "../context/rentals"


function AdDetails(props) {
 /*  const rentals = useRentals()
  const allRent = rentals?.allRentals
  console.log(allRent) */
  const images = [
    { id: 1, rental_id: 1, src: "http://placeimg.com/300/300/arch?t=1621458436225" },
    { id: 2, rental_id: 1, src: "http://placeimg.com/300/300/arch?t=1621458403576" }
   ]
  return (
    <div>
      card detail
{/*       {allRent}
 */}      {/* <ImageCarousel/>
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