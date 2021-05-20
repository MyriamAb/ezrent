import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import ImageCarousel from '../molecules/imageCarousel'
import { CarouselProvider, Slider} from "pure-react-carousel";


function CardType(props) {
  return (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1.25}
    totalSlides={3}
    style={{ width: "300px" }}
  >
      
    <Card>
      <Card.Content>
      <ImageCarousel nbSlide='3'/>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.price} €</Card.Meta>
        <Card.Description>
          {props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Icon name='usermap marker alternate' />
          {props.location}
      </Card.Content>
    </Card>
  </CarouselProvider>
  )
}
export default CardType