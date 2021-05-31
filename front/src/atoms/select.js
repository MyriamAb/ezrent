import React from 'react'
import { Select } from 'semantic-ui-react'

const SelectType =  (props) => 
<Select
  onChange={props.onChange}
  placeholder={props.placeholder}
  options={props.options}
  style={props.style}
  name={props.name}
  value={props.value}
  id={props.id}
/>


export default SelectType