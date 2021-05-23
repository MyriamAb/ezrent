import React from "react";
import { Card, Icon } from "semantic-ui-react";
import ImageCarousel from './imageCarousel'


function CardType(props) {
  return (
    <Card>
      <Card.Content>
        <ImageCarousel rental_id={props.id} rentals={props.rentals}/>
        <Card.Header>{props.title}</Card.Header>
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
  )
}
export default CardType