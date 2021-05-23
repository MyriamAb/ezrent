import React from "react";
import {  Item } from "semantic-ui-react";
import RatingType from '../atoms/rate'

function Comments() {
  return (
    <Item.Group>
      <Item>
        <Item.Image circular size='mini' src="/profileDefaultPic.jpeg" />

        <Item.Content>
          <Item.Header>Arrowhead Valley Camp</Item.Header>
          <Item.Meta>
            <span><RatingType size='huge' float='right' /></span>
          </Item.Meta>
          <Item.Description>comments test</Item.Description>
        </Item.Content>
      </Item>

      <Item>
        <Item.Image circular size='mini' src="/profileDefaultPic.jpeg" />

        <Item.Content>
          <Item.Header>Arrowhead Valley Camp</Item.Header>
          <Item.Meta>
            <span><RatingType size='huge' float='right' /></span>
          </Item.Meta>
          <Item.Description>comments test</Item.Description>
        </Item.Content>
      </Item>

     <Item>
        <Item.Image circular size='mini' src="/profileDefaultPic.jpeg" />

        <Item.Content>
          <Item.Header>Arrowhead Valley Camp</Item.Header>
          <Item.Meta>
            <span><RatingType size='huge' float='right' /></span>
          </Item.Meta>
          <Item.Description>comments test</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
export default Comments