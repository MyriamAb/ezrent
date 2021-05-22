import React from 'react'
import NumberInput from 'semantic-ui-react-numberinput'

const ButtonType = (props) => 
<NumberInput 
value={props.value} 
onChange={props.onChange}
buttonPlacement="right"
icon={props.icon}
className={props.className}
valueType= {props.valueType}
size={props.size}
/>
export default ButtonType