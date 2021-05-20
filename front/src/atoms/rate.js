import React from 'react'
import { Rating } from 'semantic-ui-react'

const RatingType = (props) => <Rating maxRating={5} disabled={props.disabled} defaultRating={props.defaultRating} size={props.size} style={{ float: props.float }}/>

export default RatingType