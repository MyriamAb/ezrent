import React from 'react'
import { Header, Image } from 'semantic-ui-react'

const HeaderForm = (props) =>
      <Header as={props.asHeader} color={props.colorHeader} textAlign={props.textAlignHeader} >
        <Image src={props.srcImage} size={props.sizeImage} circular/>{props.contentHeader}
      </Header>

export default HeaderForm