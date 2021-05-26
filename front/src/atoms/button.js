import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonType = (props) => 
<Button 
content={props.content} 
basic color={props.color}
size={props.size}
fluid={props.fluid}
onClick={props.onClick}
icon={props.icon}
iconPosition={props.iconPosition}
as={props.as}
href={props.href}
/>
export default ButtonType