import Review from './review'
import {
  Container,
  Image,
} from 'semantic-ui-react'
import Search from '../molecules/search'

function Home() {
  const styles = {
    container: {
      backgroundImage: `url('https://i.ibb.co/LCFVjr4/background-home-resize.jpg')`,
      backgroundSize: 'cover',
      paddingTop: 300,
      paddingLeft: 400,
      paddingRIght:400,
      height: 600
    },
    search: {
      width: 300,
      opacity: 0.7

    }
  }
  
  return (
    <div>

    <div style={styles.container}>
{/*       <Image src="https://i.ibb.co/LCFVjr4/background-home-resize.jpg"/>
 */}      <Search style={styles.search}/>
    </div>
    <Review/>
 </div>
    
  )
}

export default Home

