import React from 'react'
import { Checkbox } from 'semantic-ui-react'

function CheckboxType(props) {
  return (
    <Checkbox 
    label={props.label} 
    style={props.style} 
    disabled={props.disabled} 
    onClick={props.onClick} 
    defaultChecked={props.defaultChecked} 
    onChange={props.onChange} 
    value={props.value} 
    id={props.id}
    />
  )
}
export default CheckboxType