import { Card } from 'semantic-ui-react'
import Search from '../molecules/search'
import CardCarousel from './cardCarousel'

function Home() {
  const styles = {
    container: {
      backgroundImage: `url('https://i.ibb.co/LCFVjr4/background-home-resize.jpg')`,
      backgroundSize: 'cover',
      paddingTop: 300,
      height: 600
    },
    search: {
      FontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      opacity: 0.8
    }
  }
  
  return (
    <div>
      <div style={styles.container}>
        <Search style={styles.search}/> 
      </div>
     
      <CardCarousel/>  
      
    </div>
    
  )
}

export default Home

