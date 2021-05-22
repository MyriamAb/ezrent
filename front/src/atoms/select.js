import React from 'react'
import { Select } from 'semantic-ui-react'

const SelectType =  (props) => 
<Select
  onChange={props.onChange}
  placeholder={props.placeholder}
  options={props.options}
  style={props.style}  
/>


export default SelectType