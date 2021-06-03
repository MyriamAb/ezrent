import React, {useState} from 'react'
import { Card, Pagination } from "semantic-ui-react";
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
        <Card.Group itemsPerRow={5}>
        {cardItem}
        </Card.Group>
    {/*     <Pagination defaultActivePage={1} totalPages={totalPages}/>
    */}    </div>
    )  
    
}

export default CardCarousel;

function CardCarousel() {
    const rentalsContext = useRentals()
    var rentals = rentalsContext?.resultSearch ?? null;
    const [currentPage, setcurrentPage] = useState(1); 
    const [itemsPerPage, setitemsPerPage] = useState(2);

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
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage == number ? "active" : null}
                >
                    {number}
                </li>
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
          <h1>Todo List</h1> <br />
          {renderData(currentItems)}
    
          <ul className="pageNumbers">
            <li>
              <button onClick = {handlePrevBtn} disabled={currentPage==pages[0] ? true : false}>Prev</button>
            </li>
           {renderPageNumbers}
           <li>
              <button onClick = {handleNextBtn}  disabled={currentPage==pages[pages.length-1] ? true : false}>Next</button>
            </li>
          </ul>    
        </>
      );
}
