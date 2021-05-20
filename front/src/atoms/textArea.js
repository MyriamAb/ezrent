import React from 'react'
import { TextArea } from 'semantic-ui-react'

const TextAreaType = (props) => (
      <TextArea placeholder={props.placeholder} style={{ minWidth: props.minWidth, minHeight: props.minHeight, marginLeft: props.marginLeft, marginRight:props.marginRight}}/>
  )

export default TextAreaType