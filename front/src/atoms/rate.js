import React from 'react'
import { Rating } from 'semantic-ui-react'

const RatingType = (props) => <Rating maxRating={5} clearable size={props.size} style={{ float: props.float }}/>

export default RatingType