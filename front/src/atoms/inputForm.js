import React from 'react'
import { Form } from 'semantic-ui-react'

const InputFormType =  (props) => 
<Form.Input
fluid icon={props.icon} 
iconPosition={props.iconPosition} 
placeholder={props.placeholder}
type={props.type}
/>

export default InputFormType