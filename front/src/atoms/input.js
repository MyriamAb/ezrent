import React from 'react'
import { Input } from 'semantic-ui-react'

const InputType =  (props) => 
<Input
    fluid icon={props.icon}
    name={props.name}
    value={props.value}
  iconPosition={props.iconPosition} 
  placeholder={props.placeholder}
  type={props.type}
  onChange={props.onChange}
  style={props.style}  
/>


export default InputType