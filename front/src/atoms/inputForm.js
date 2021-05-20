import React from 'react'
import { Form } from 'semantic-ui-react'

const InputFormType =  (props) => 
<Form.Input
fluid icon={props.icon}
iconPosition='left' 
placeholder={props.placeholder}
type={props.type}
onChange={props.onChange}
id={props.id}
onKeyUp={props.onKeyUp}
/>

export default InputFormType