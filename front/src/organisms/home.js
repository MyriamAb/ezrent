import Search from '../molecules/search'
import CardCarousel from '../molecules/adCardHome'

function Home() {
  const styles = {
    container: {
      backgroundImage: `url('https://i.ibb.co/LCFVjr4/background-home-resize.jpg')`,
      backgroundSize: 'cover',
      paddingTop: 300,
      /* paddingLeft: 400,
      paddingRIght:400, */
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

