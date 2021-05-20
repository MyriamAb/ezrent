import React from 'react'
import { Checkbox } from 'semantic-ui-react'

function CheckboxType(props) {
  return (
    <Checkbox label={props.label}  onClick={props.onClick} defaultChecked={props.defaultChecked} onChange={props.onChange} value={props.value} />
  )
}
export default CheckboxType