import React from 'react'
import { TextArea } from 'semantic-ui-react'

const TextAreaType = (props) => (
      <TextArea 
      placeholder={props.placeholder} 
      onChange={props.onChange}
      id={props.id}
      style={{ minWidth: props.minWidth, minHeight: props.minHeight, marginLeft: props.marginLeft, marginRight:props.marginRight, marginTop: props.marginTop}}/>
  )

export default TextAreaType