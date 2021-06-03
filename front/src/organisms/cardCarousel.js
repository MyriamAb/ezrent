import React, {useState} from 'react'
import { Card, Container, Grid } from "semantic-ui-react";
import CardType from "../molecules/cardType";
import "pure-react-carousel/dist/react-carousel.es.css"
import useRentals from '../context/rentals'

function renderData(rentals) {
    var cardItem= []  
 
    if (rentals === null || rentals === undefined) {
        cardItem.push(<Card></Card>)
    }
    else {
        for (let i = 0; i < rentals.length; i++) {
        cardItem.push(
            <CardType title={rentals[i].title} description={rentals[i].description} price={rentals[i].price} location={rentals[i].address} id={rentals[i].id} style={{ marginTop: '3px' }}/>
        )  
      }
    } 

    return (
      <div>
        <Grid >
          <Grid.Row>
            <Grid.Column width={1}> 
            </Grid.Column>
            <Grid.Column width={14}> 
              <Card.Group itemsPerRow={4}>
                {cardItem}
              </Card.Group>
            </Grid.Column>
            <Grid.Column width={1}> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>
    )  
}

export default CardCarousel;

function CardCarousel() {
    const rentalsContext = useRentals()
    var rentals = rentalsContext?.resultSearch ?? null;
    const [currentPage, setcurrentPage] = useState(1); 
    const [itemsPerPage, setitemsPerPage] = useState(8);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const pages = []
    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id))
    }
    
    if(rentals !== null && rentals !== undefined){
      for( let i=1;i <= Math.ceil(rentals.length / itemsPerPage); i ++){ 
        pages.push(i)
      }
    }
    
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = rentals?.slice(indexOfFirstItem, indexOfLastItem)
    
    const renderPageNumbers = pages.map((number) => { 
        if(number< maxPageNumberLimit+1 && number>minPageNumberLimit){
            return (
                  <button  key={number} id={number} onClick={handleClick}
                    className={currentPage == number ? "active item" : null}>
                      {number}
                  </button>
                );
        }else{
            return null
        }
    });

    const handleNextBtn = () =>{
      setcurrentPage(currentPage+1)

      if (currentPage+1>maxPageNumberLimit){
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
      }
    }

    const handlePrevBtn = () => {
      setcurrentPage(currentPage-1)

      if ((currentPage-1)%pageNumberLimit === 0){
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
      }
    }

  return (
    <>
    {renderData(currentItems)}
      <br/>
      <Container textAlign="center">
          <div class="ui pagination menu">
            <button onClick = {handlePrevBtn} disabled={currentPage==pages[0] ? true : false}>Prev</button>
            {renderPageNumbers}
            <button onClick = {handleNextBtn}  disabled={currentPage==pages[pages.length-1] ? true : false}>Next</button>
          </div>
          <br/>
      </Container>
    </>
    );
}